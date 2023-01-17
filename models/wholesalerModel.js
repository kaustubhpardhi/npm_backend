const mongoose = require("mongoose");

const wholesalerSchema = new mongoose.Schema({
  name: String,
  id: {
    type: String,
    required: true,
    unique: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  personalDocs: [{ type: mongoose.Schema.Types.ObjectId, ref: "PersonalDocs" }],
  businessDocs: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusinessDocs" }],
  warehouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Warehouses" }],
  purchaseOrders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrders" },
  ],
});

const Wholesaler = mongoose.model("Wholesaler", wholesalerSchema);
module.exports = Wholesaler;
