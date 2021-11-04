const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db.js");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

//allow all cross platform requests
app.use(
  cors({
    origin: ["http://localhost:3000", "https://nutgames.netlify.app"],
  })
);

// Parse JSON data
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to nut-games");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
