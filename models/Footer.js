import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  aboutText: String,

  quickLinks: [
    {
      name: String,
      link: String
    }
  ],

  categories: [
    {
      name: String,
      link: String
    }
  ],

  contact: {
    email: String,
    phone: String,
    address: String
  },

  socialLinks: {
    instagram: String,
    facebook: String,
    twitter: String
  }
});

export default mongoose.model("Footer", footerSchema);
