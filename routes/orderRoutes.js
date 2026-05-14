import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const router = express.Router();


/* CREATE ORDER */
router.post("/create", async (req, res) => {

  try {

    const { userId, address, city, pincode } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.productId.pricePerKg * item.quantity;
    }, 0);

    const order = new Order({

      userId,
      items: cart.items,
      totalAmount,
      address,
      city,
      pincode

    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Order failed"
    });

  }

});


/* GET USER ORDERS */
router.get("/:userId", async (req, res) => {

  const orders = await Order.find({
    userId: req.params.userId
  }).populate("items.productId");

  res.json(orders);

});

router.put("/cancel/:orderId", async (req, res) => {

  try {

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: "Cancelled" },
      { new: true }
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: "Cancel failed"
    });

  }

});

export default router;