const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
require("dotenv").config();

// Sign Up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // check what username length is more than 4
    if (username.length <= 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    // check if username already exists
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // check if email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // password less than 6
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password's length should be greater than 5" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      password: hashPass,
      email: email,
      address: address,
    });

    await newUser.save();
    return res.status(200).json({ message: "Sign-Up Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Servor Error" });
  }
});

// Sign In
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (err) {
        // Handle the error that occurred during password comparison
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (data) {
        // Passwords match
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        // Passwords do not match
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      }
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    res.status(200).json({ message: "address updated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
