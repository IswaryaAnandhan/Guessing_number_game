const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
name: { type: String, required: true },
guesses: { type: Number, required: true },
time: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("userScores", scoreSchema);