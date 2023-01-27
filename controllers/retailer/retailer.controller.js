const db = require("../../models");
const Retailer = db.retailer;
const RetailerLogin = db.retailerLogin;
const jwt = require("jsonwebtoken");

exports.addRetailer = (req, res) => {
  const newRetailer = new Retailer({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: req.body.address,
    pinCode: req.body.pincode,
    state: req.body.state,
  });

  newRetailer.save((err, savedRetailer) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database Error");
    } else {
      res.status(200).send("Retailer successfully added");
    }
  });
};

exports.getAllRetailer = (req, res) => {
  Retailer.find((error, retailers) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      res.status(200).json(retailers);
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const retailer = await RetailerLogin.findOne({ email });
    //if no user is found with provided email
    if (!retailer) {
      return res.status(401).send({ errror: "Sorry, Email not found" });
    }
    //check for password
    const isMatched = await retailer.isValidPassword(password);
    // If the password is not matched
    if (!isMatched) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    //create a jwt
    const token = jwt.sign({ id: retailer._id }, "kaustubh", {
      expiresIn: "8h",
    });
    //send the jwt as response
    res.status(200).send({ email: retailer.email, token: token });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};
