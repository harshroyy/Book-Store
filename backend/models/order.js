const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User", // Updated to match the User model
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "Book", // Updated to match the Book model
  },
  status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Out for Delivery", "Delivered", "Canceled"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
