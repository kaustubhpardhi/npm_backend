const mongoose = require("mongoose");

const businessDocs = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: Buffer,
    required: true,
  },
  wholesaler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wholesaler",
    required: true,
  },
});

const BusinessDocs = mongoose.model("BusinessDocs", businessDocs);
module.exports = { BusinessDocs };
