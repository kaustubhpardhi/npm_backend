const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  wholesaler_id: { type: mongoose.Schema.Types.ObjectId, ref: "Wholesaler" },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
