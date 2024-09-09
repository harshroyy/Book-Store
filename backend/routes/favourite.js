const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book"); // Adjust the path as necessary
const Order = require("../models/order"); // Adjust the path as necessary
const { authenticateToken } = require("./userAuth");

// add book to favourite
router.put("/add-book-to-favourite/", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);

    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book already in favourites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// remove book to favourite
router.put("/remove-book-from-favourite/",authenticateToken,async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);

      const isBookFavourite = userData.favourites.includes(bookid);
      if (isBookFavourite) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
      }
      return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// get favourite books of a particular user
router.get("/get-favourite-books/", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; 
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userData = await User.findById(id).populate("favourites");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const favouriteBooks = userData.favourites;

    return res.json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.error('Error in /get-favourite-books route:', error); // Detailed logging
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
