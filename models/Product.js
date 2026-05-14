import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  slug: {
    type: String,
    unique: true
  },

  category: {
    type: String,
    required: true
  },

  season: {
    type: String
  },

  pricePerKg: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  benefits: [
    {
      type: String
    }
  ],

  description: {
    type: String
  }

},
{
  timestamps: true
});

export default mongoose.model(
  "Product",
  productSchema,
  "Products"
);