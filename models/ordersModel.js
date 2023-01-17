const mongoose = require("mongoose");
//retailer
const orderSchema = new mongoose.Schema({
  wholesaler_id: { type: mongoose.Schema.Types.ObjectId, ref: "Wholesaler" },
  retailer_name: String,
  order_date: Date,
  items: [{ productId: String, quantity: Number }],
  total_price: Number,
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
