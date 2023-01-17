const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  managerName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  wholesaler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wholesaler",
    required: true,
  },
});

const Warehouses = mongoose.model("Warehouses", warehouseSchema);
module.exports = { Warehouses };
