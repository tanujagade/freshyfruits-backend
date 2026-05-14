import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import seasonalRoutes from "./routes/seasonalRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orderRoutes.js";
// import paymentRoutes from "./routes/payment.js";

dotenv.config();
connectDB();

const app = express();

/* MIDDLEWARE */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* STATIC FILES */
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/seasonals", seasonalRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("FreshyFruits API Running 🍎");
});

/* SERVER START */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});