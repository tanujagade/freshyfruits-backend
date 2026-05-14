import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

/* ADD TO CART */
router.post("/add", async (req, res) => {
  try {

    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId required"
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {

      cart = new Cart({
        userId,
        items: [{
          productId,
          quantity: quantity || 1
        }]
      });

    } else {

      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId.toString()
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          productId,
          quantity: quantity || 1
        });
      }

    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {

    console.error("Cart error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
});


/* GET USER CART */
router.get("/:userId", async (req, res) => {
  try {

    const cart = await Cart.findOne({
      userId: req.params.userId
    }).populate("items.productId");

    res.status(200).json(cart || { items: [] });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching cart"
    });

  }
});


/* REMOVE ITEM FROM CART (FIXED) */
router.delete("/remove/:itemId", async (req, res) => {

  try {

    const { userId } = req.query; // ✅ GET USER ID

    const cart = await Cart.findOne({ userId }); // ✅ FIX

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    );

    await cart.save();

    res.json({
      message: "Item removed",
      cart
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error removing item"
    });

  }

});


/* UPDATE QUANTITY */
router.put("/update", async (req, res) => {

  try {

    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    res.json({
      message: "Quantity updated",
      cart
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error updating quantity"
    });

  }

});


/* CLEAR CART */
router.delete("/clear/:userId", async (req, res) => {

  try {

    const cart = await Cart.findOne({
      userId: req.params.userId
    });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({
      message: "Cart cleared"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error clearing cart"
    });

  }

});

export default router;