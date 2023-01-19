const db = require("../../models");
const Product = require("../../models/productModel");
const Category = db.category;
const Wholesaler = db.category;
exports.addCategory = async (req, res) => {
  try {
    const wholesaler = await Wholesaler.findOne({ id: req.body.wholesaler_id });
    if (!wholesaler) {
      res.status(404).send({ error: "Wholesaler not found" });
    }
    const newCategory = new Catgeory({
      name: req.body.name,
      description: req.body.description,
      wholesaler_id: wholesaler._id,
    });
    await newCategory.save();
    res.status(200).send({ message: "Category saved succesfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getWholesalerCategories = async (req, res) => {
  try {
    const { wholesaler_id } = req.body;
    const wholesaler = await Wholesaler.findOne({ id: wholesaler_id });
    const category = await Category.find({
      wholesaler_id: { $in: wholesaler._id },
    });
    res.status(200).send({ categories: category });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};
