const db = require("../../models");
const Retailer = db.retailer;

exports.addRetailer = (req, res) => {
  const newRetailer = new Retailer({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    address: req.body.address,
    pinCode: req.body.pincode,
    state:req.body.state,
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
