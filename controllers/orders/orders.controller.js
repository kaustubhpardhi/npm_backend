const db = require("../../models");
const Orders = db.orders;
const Wholesaler = db.wholesaler;
const Product = db.product;

exports.createOrder = async (req, res) => {
  const { wholesaler_id, retailer_name, order_date, items } = req.body;

  //find corresponding wholesaler based on name
  const wholesaler = await Wholesaler.findOne({ id: wholesaler_id });
  if (!wholesaler) {
    res.status(404).send({ error: "Wholesaler not found" });
  }

  //find the corresponding products
  const products = await Product.find({
    name: { $in: items.map((i) => i.productName) },
  });
  const total_price = products.reduce((total, product) => {
    const item = items.find((i) => i.productName === product.name);
    return total + product.price * item.quantity;
  }, 0);

  // Create the order document
  const order = new Order({
    wholesaler_id: wholesaler._id,
    retailer_name,
    order_date,
    items: items.map((item) => ({
      productId: products.find((p) => p.name === item.productName)._id,
      quantity: item.quantity,
    })),
    total_price,
  });
  await order.save();

  // Send the response
  res.send({ message: "Order created successfully", order });
};
