const db = require("../../models");
const Product = require("../../models/productModel");
const Category = db.category;
const Wholesaler = db.category;
exports.addCategory = async (req, res) => {
  try {
    const { wholesaler_id, name, description } = req.body;
    const wholesaler = Wholesaler.findOne({ id: wholesaler_id });
    if (!wholesaler) {
      res.status(404).send({ error: "Wholesaler not found" });
    }
    const newCategory = new Category({
      name: name,
      description: description,
      wholesaler_id: wholesaler._id,
    });
    await newCategory.save();
    res.status(200).send({ message: "Category saved succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getWholesalerCategories = async (req, res) => {
  try {
    const { wholesaler_id } = req.body;
    const wholesaler = Wholesaler.findOne({ id: wholesaler_id });
    if (!wholesaler) {
      res.status(404).send({ error: "Wholesaler not found" });
    }
    const categories = await Category.find({ wholesaler_id: wholesaler._id });
    res.status(200).send({ Category: categories });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
