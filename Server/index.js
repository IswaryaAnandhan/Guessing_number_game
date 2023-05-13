const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Score = require("./model/userScores");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:3000"
}))

mongoose.connect(process.env.MONGODB_URI
    
    
    , {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
console.log("Connected to MongoDB!");
});
app.get("/", function (req, res) {
    res.send("<h1>Guessing number game Project...</h1>");
  });
app.use("/api/score", require("./route/score"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
console.log(`Server started on port ${port}`);
});