const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Books = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; // Get user ID from headers
    const { order } = req.body; // Get the order array from the request body

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      // Saving order in user models
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id }, // Update orders field
      });

      // Clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get order history
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    // Find all orders for the user, populate the book details
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all orders (Admin only)
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })

      .populate({
        path: "user",
      })

      .sort({ createdAt: -1 });

    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// update order --admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
   try {
     const {id} = req.params;
     await Order.findByIdAndUpdate(id, {status: req.body.status})
     return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
    } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
   }
})

module.exports = router;
