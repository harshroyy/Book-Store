const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book"); // Adjust the path as necessary
const Order = require("../models/order"); // Adjust the path as necessary
const { authenticateToken } = require("./userAuth");

// add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);

    const isBookinCart = userData.cart.includes(bookid);
    if (isBookinCart) {
      return res.status(200).json({ message: "Book already in cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });

    return res.json({
      status: "Sucess",
      message: "Book removed from cart",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get cart of a particular user
router.get("/get-user-cart/", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const userData = await User.findById(id).populate("cart");
      const cart = userData.cart.reverse();
  
      return res.json({
        status: "Success",
        data: cart,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


  module.exports = router;
