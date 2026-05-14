import Footer from "../models/Footer.js";

// GET FOOTER DATA
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
