import express from "express";
import User from "../models/User.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
