const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  wholesaler_id: { type: mongoose.Schema.Types.ObjectId, ref: "Wholesaler" },
  name: String,
  productId: String,
  description: String,
  quantity: Number,
  price: Number,
  mrp: Number,
  sellingPrice: Number,
  discountPrice: Number,
  commissionPercentage: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
