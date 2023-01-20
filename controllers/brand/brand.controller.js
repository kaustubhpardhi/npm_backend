const db = require("../../models");
const Brand = db.brand;
const Product = db.product;
const Wholesaler = db.wholesaler;
exports.addBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newBrand = new Brand({
      name: name,
      description: description,
    });
    await newBrand.save();
    res.status(200).send({ message: "Brand added successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getAllBrandNames = async (req, res) => {
  try {
    const brands = await Brand.find();
    const brandNames = brands.map((brand) => brand.name);
    res.status(200).json(brandNames);
  } catch (error) {
    res.status(500).send({ error: "Internal server Error" });
  }
};
