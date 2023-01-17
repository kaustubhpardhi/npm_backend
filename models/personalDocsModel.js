const mongoose = require("mongoose");

const personalDocs = new mongoose.Schema({
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

const PersonalDocs = mongoose.model("PersonalDocs", personalDocs);
module.exports = { personalDocs };
