import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import seasonalRoutes from "./routes/seasonalRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orderRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

/* CONFIG */
dotenv.config();

/* DATABASE CONNECTION */
connectDB();

const app = express();

/* MIDDLEWARE */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FILES */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "Uploads"))
);

/* API ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/seasonals", seasonalRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chatbot", chatRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("FreshyFruits API Running 🍎");
});

/* 404 HANDLER */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});