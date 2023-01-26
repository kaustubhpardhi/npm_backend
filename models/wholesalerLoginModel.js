const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var uuid = require("uuid/v4");

const wholesalerLoginSchema = new mongoose.Schema({
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

wholesalerLoginSchema.pre("save", async function (next) {
  const wholesaler = this;
  if (wholesaler.isModified("password")) {
    wholesaler.password = await bcrypt.hash(wholesaler.password, 10);
  }
  next();
});

wholesalerLoginSchema.methods.isValidPassword = async function (password) {
  const wholesaler = this;
  const compare = await bcrypt.compare(password, wholesaler.password);
  return compare;
};

const WholesalerLogin = mongoose.model(
  "WholesalerLogin",
  wholesalerLoginSchema
);
module.exports = WholesalerLogin;
