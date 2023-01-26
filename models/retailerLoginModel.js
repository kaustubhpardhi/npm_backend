const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const retailerLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

retailerLoginSchema.pre("save", async function (next) {
  const retailer = this;
  if (retailer.isModified("password")) {
    retailer.password = await bcrypt.hash(retailer.password, 10);
  }
  next();
});

retailerLoginSchema.methods.isValidPassword = async function (password) {
  const retailer = this;
  const compare = await bcrypt.compare(password, retailer.password);
  return compare;
};

const RetailerLogin = mongoose.model("RetailerLogin", retailerLoginSchema);
module.exports = RetailerLogin;
