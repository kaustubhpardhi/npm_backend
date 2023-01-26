const db = require("../../models");
const WholesalerLogin = db.wholesalerLogin;
const RetailerLogin = db.retailerLogin;
var uuid = require("uuid/v4");

exports.wholesalerSignup = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = WholesalerLogin.findOne({ email: email });
  if (emailExist) {
    res.status(200).send({ message: "user already registered" });
    return;
  }
  const wholesaler = new WholesalerLogin({
    email: email,
    password: password,
    id: uuid(),
  });
  await wholesaler.save();
  res
    .status(200)
    .send({ message: "Wholesaler account created", wholesaler: wholesaler });
};

exports.retailerSignup = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = RetailerLogin.findOne({ email: email });
  if (emailExist) {
    res.status(200).send({ message: "user already registered" });
    return;
  }
  const retailer = new RetailerLogin({
    email: email,
    password: password,
    id: uuid(),
  });
  await retailer.save();
  res
    .status(200)
    .send({ message: "retailer account created", retailer: retailer });
};
