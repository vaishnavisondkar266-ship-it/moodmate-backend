const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;