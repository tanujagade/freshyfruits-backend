import express from "express";
import Carousel from "../models/Carousel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const slides = await Carousel.find();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
