const Fruit = require("../models/Fruit");

// GET fruits by category
exports.getFruitsByCategory = async (req, res) => {
  try {
    const fruits = await Fruit.find({
      category: req.params.categoryName,
    });

    res.json(fruits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH fruits
exports.searchFruits = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const fruits = await Fruit.find({
      name: { $regex: keyword, $options: "i" },
    });

    res.json(fruits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};