import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String, // image path
  link: String,
});

export default mongoose.model("Carousel", carouselSchema);
