const db = require("../../models");
const WholesalerLogin = db.wholesalerLogin;
const RetailerLogin = db.retailerLogin;
const shortid = require("shortid");

exports.wholesalerSignup = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await WholesalerLogin.findOne({ email });
  if (emailExist) {
    res.status(200).send({ message: "user already registered" });
  } else {
    const id = shortid.generate();
    const wholesaler = new WholesalerLogin({
      email: email,
      password: password,
      id: id,
    });
    await wholesaler.save();
    res.status(200).send({ message: "Wholesaler account created", id: id });
  }
};

exports.retailerSignup = async (req, res) => {
  const { email, password } = req.body;
  const emailExist = RetailerLogin.findOne({ email: email });
  //   if (emailExist) {
  //     res.status(200).send({ message: "user already registered" });
  //     return;
  //   }
  const id = shortid.generate();
  const retailer = new RetailerLogin({
    email: email,
    password: password,
    id: id,
  });
  await retailer.save();
  res
    .status(200)
    .send({ message: "retailer account created", retailer: retailer });
};
