const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: Number, required: true },
});

const Retailer = mongoose.model("Retailer", retailerSchema);
module.exports = Retailer;
