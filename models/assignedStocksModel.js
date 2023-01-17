const mongoose = require("mongoose");

//schema for the lists of stock assigned to retailers
const assignedStocksSchema = new mongoose.Schema({
  wholesaler_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wholesaler",
    required: true,
  },
  retailer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  assigned_date: {
    type: Date,
    default: Date.now(),
  },
  payment_status: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  sold_status: {
    type: String,
    enum: ["sold", "unsold"],
    default: "unsold",
  },
});
const AssignedStocks = mongoose.model("AssignedStocks", assignedStocksSchema);
module.exports = AssignedStocks;
