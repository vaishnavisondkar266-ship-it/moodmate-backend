const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");

// Add Mood Entry
router.post("/add", async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.json({ message: "Entry Saved Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Entries
router.get("/", async (req, res) => {
  const entries = await Entry.find();
  res.json(entries);
});

module.exports = router;