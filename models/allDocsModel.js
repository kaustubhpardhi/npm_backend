const mongoose = require("mongoose");

const allDocs = new mongoose.Schema({
  wholesaler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wholesaler",
    required: true,
  },
  personalDocs: [{ type: mongoose.Schema.Types.ObjectId, ref: "PersonalDocs" }],
  businessDocs: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusinessDocs" }],
});

const AllDocs = mongoose.model("AllDocs", allDocs);
module.exports = { AllDocs };
