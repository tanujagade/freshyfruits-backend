import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* ADD PRODUCT */
router.post("/add", async (req, res) => {

  try {

    const product = new Product(req.body);

    await product.save();

    res.status(201).json({
      message: "Product Added",
      product
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error adding product"
    });

  }

});


/* GET ALL PRODUCTS */
router.get("/", async (req, res) => {

  try {

    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching products"
    });

  }

});


/* GET PRODUCTS BY CATEGORY */
router.get("/category/:category", async (req, res) => {

  try {

    const products = await Product.find({
      category: req.params.category
    });

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching category products"
    });

  }

});


/* GET PRODUCTS BY SEASONAL */
router.get("/seasonal/:slug", async (req, res) => {

  try {

    const products = await Product.find({
      season: req.params.slug
    });

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching seasonal products"
    });

  }

});


/* SEARCH PRODUCTS */
router.get("/search/:query", async (req, res) => {

  try {

    const query = req.params.query;

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });

    res.json(products);

  } catch (err) {

    console.error("Search Error:", err);

    res.status(500).json({
      message: "Error searching products"
    });

  }

});


/* GET SINGLE PRODUCT */
router.get("/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    res.json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching product"
    });

  }

});

export default router;