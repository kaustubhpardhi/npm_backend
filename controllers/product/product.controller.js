const db = require("../../models");
const Product = db.product;
const Wholesaler = db.wholesaler;
const Category = db.category;
const Brand = db.brand;

// Find the corresponding ObjectIds for the references
const getReferences = async (wholesalerId, categoryName, brandName) => {
  const [wholesaler, category, brand] = await Promise.all([
    Wholesaler.findOne({ id: wholesalerId }),
    Category.findOne({ name: categoryName }),
    Brand.findOne({ name: brandName }),
  ]);
  return {
    wholesalerId: wholesaler ? wholesaler._id : null,
    categoryId: category ? category._id : null,
    brandId: brand ? brand._id : null,
  };
};

exports.addProduct = async (req, res) => {
  try {
    const {
      wholesaler_id,
      name,
      productId,
      description,
      quantity,
      price,
      mrp,
      sellingPrice,
      discountPrice,
      commissionPercentage,
      category_name,
      brand_name,
    } = req.body;

    const references = await getReferences(
      wholesaler_id,
      category_name,
      brand_name
    );

    const product = new Product({
      ...references,
      name,
      productId,
      description,
      quantity,
      price,
      mrp,
      sellingPrice,
      discountPrice,
      commissionPercentage,
    });

    await product.save();
    res.status(200).send({ message: "Product saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addProductsBulk = async (req, res) => {
  exports.addProducts = function (req, res) {
    // Create an array of products to insert
    const products = [
      //For Example json of 1000 products
      // Add more products here
    ];

    // Insert the products into the database
    Product.insertMany(products, function (error) {
      if (error) {
        res.send(error);
      } else {
        res.send("Successfully added ... products to the database");
      }
    });
  };
};

exports.productStockList = async (req, res) => {
  Product.find({ quantity: { $lt: 50 } }, function (error, products) {
    if (error) {
      res.status(500).send({ message: "Database Error" });
    } else {
      res.status(200).send(products);
    }
  });
};
