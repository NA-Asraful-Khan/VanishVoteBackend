import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import pollRoutes from "./routes/polls.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://naapibun_mongou:8ZSnd2Y45apM@160.25.226.5:27017/naapibun_vanishvote?authSource=admin"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the VanishVote API!");
});

// Routes
app.use("/api/polls", pollRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
