const db = require("../../models");
const Wholesaler = db.wholesaler;
const Product = db.product;
const AssignedStocks = db.assignedStocks;
const Retailer = db.retailer;
const WholesalerLogin = db.wholesalerLogin;
const jwt = require("jsonwebtoken");

exports.addWholesaler = (req, res) => {
  const newWholesaler = new Wholesaler({
    id: req.body.id,
    name: req.body.name,
    products: req.body.products,
    orders: req.body.orders,
    personalDocs: req.body.personalDocs,
    businessDocs: req.body.businessDocs,
    warehouses: req.body.warehouses,
    purchaseOrders: req.body.purchaseOrders,
  });

  newWholesaler.save((err, savedWholesaler) => {
    if (err) {
      console.log(err);
      // Return an error response if there was a problem saving the wholesaler
      return res.status(500).send(err.message);
    }
    // Return the saved wholesaler document
    res.status(200).send(savedWholesaler);
  });
};

exports.getAllWholesaler = (req, res) => {
  Wholesaler.find((error, wholesalers) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      res.status(200).json(wholesalers);
    }
  });
};

exports.getWholesalerById = async (req, res) => {
  try {
    const { id } = req.body;
    const wholesaler = await Wholesaler.findById(id);

    if (!wholesaler) {
      return res.status(200).send({ message: "Wholesaler not found !" });
    } else {
      res.status(500).send(wholesaler);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.assignedStocks = async (req, res) => {
  const {
    wholesaler_name,
    retailer_name,
    product_name,
    quantity,
    payment_status,
    sold_status,
  } = req.body;

  //find the corresponding wholesaler based on name or id
  const wholesaler = await Wholesaler.findOne({ name: wholesaler_name });
  if (!wholesaler) {
    return res.status(404).send({ error: "Wholesaler not found" });
  }
  //find corresponding retailer based on name
  const retailer = await Retailer.findOne({ name: retailer_name });
  if (!retailer) {
    return res.status(404).send({ error: "Retailer not found" });
  }
  //find corresponding product based on name
  const product = await Product.findone({ name: product_name });
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }

  // create the product assignment document
  const assignedStocks = new AssignedStocks({
    wholesaler_id: wholesaler._id,
    retailer_id: retailer._id,
    product_id: product._id,
    quantity,
    payment_status,
    sold_status,
  });

  await assignedStocks.save();

  res.status(200).send({ message: "Product saved succesfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const wholesaler = await WholesalerLogin.findOne({ email });
    //if no user is found with provided email
    if (!wholesaler) {
      return res.status(401).send({ errror: "Sorry, Email not found" });
    }
    //check for password
    const isMatched = await wholesaler.isValidPassword(password);
    // If the password is not matched
    if (!isMatched) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    //create a jwt
    const token = jwt.sign({ id: wholesaler._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    //send the jwt as response
    res.status(200).send({ email: wholesaler.email, token: token });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};
