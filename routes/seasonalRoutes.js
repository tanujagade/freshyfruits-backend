import express from "express";
import Seasonal from "../models/Seasonal.js";

const router = express.Router();

// Get all seasonal types
router.get("/", async (req, res) => {
  try {
    const seasonals = await Seasonal.find();
    res.json(seasonals);
  } catch (error) {
    res.status(500).json({ message: "Failed to load seasonal fruits" });
  }
});

export default router;
