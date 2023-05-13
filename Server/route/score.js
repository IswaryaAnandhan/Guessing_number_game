const express = require("express");
const router = express.Router();
const Score = require("../model/userScores");

router.get("/", (req, res) => {
Score.find({})
.sort({ time: 1, guesses: 1 })
.limit(10)
.then((scores) => {
res.json(scores);
})
.catch((err) => {
console.error(err);
res.sendStatus(500);
});
});

router.post("/", (req, res) => {
const { name, guesses } = req.body;
const time = Date.now();
const score = new Score({ name, guesses, time });
score
.save()
.then(() => {
Score.find({})
.sort({ time: 1, guesses: 1 })
.limit(10)
.then((scores) => {
res.json(scores);
})
.catch((err) => {
console.error(err);
res.sendStatus(500);
});
})
.catch((err) => {
console.error(err);
res.sendStatus(500);
});
});

module.exports = router;