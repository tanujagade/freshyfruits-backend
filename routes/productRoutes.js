import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const router = express.Router();

/* ==========================
   ADD PRODUCT
========================== */
router.post("/add", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
});

/* ==========================
   GET ALL PRODUCTS
========================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

/* ==========================
   GET PRODUCTS BY CATEGORY
========================== */
router.get("/category/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const products = await Product.find({
      category: slug,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
    });
  }
});

/* ==========================
   GET PRODUCTS BY SEASON
========================== */
router.get("/seasonal/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const products = await Product.find({
      season: slug,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Season Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch seasonal products",
    });
  }
});

/* ==========================
   SEARCH PRODUCTS
========================== */
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;

    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          category: {
            $regex: query,
            $options: "i",
          },
        },
        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Search Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to search products",
    });
  }
});

/* ==========================
   GET SINGLE PRODUCT
========================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Single Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
});

export default router;