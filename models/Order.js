import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      quantity: Number
    }
  ],

  totalAmount: Number,

  address: String,

  city: String,

  pincode: String,

  paymentMethod: {
    type: String,
    default: "COD"
  },

  status: {
    type: String,
    default: "Order Placed"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);