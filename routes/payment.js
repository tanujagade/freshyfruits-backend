import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

// 🔑 Replace with your keys
const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET"
});

// ✅ CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100, // ₹ to paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

// ✅ VERIFY PAYMENT
router.post("/verify", (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", "YOUR_KEY_SECRET")
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

export default router;