const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  userId: String,
  mood: String,
  sleepHours: Number,
  journal: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Entry", entrySchema);