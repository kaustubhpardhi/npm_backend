const mongoose = require("mongoose");

//add a schema for personal doc id

//add a schema for business doc id

//list of docs

//warehouse schema - id,location,name,manager_name,contact_no

//role-list schema

//specific product details id schema

//category schema

//brand schema

const Wholesaler = mongoose.model("Wholesaler", wholesalerSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Wholesaler, Product, Order };

const { Wholesaler } = require("./models");

Wholesaler.findOne({ name: "Acme Wholesale Inc." }, (error, wholesaler) => {
  if (error) {
    console.log(error);
  } else {
    const product = new Product({
      wholesaler_id: wholesaler._id,
      name: "Paper towels",
      productId: "PT1234",
      description: "Ultra absorbent paper towels for commercial use",
      quantity: 1000,
      price: 0.25,
    });
    product.save((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Product saved successfully");
      }
    });
  }
});

//aggrement flag
//policy flag
//doc update flag
