const controller = require("../../controllers/product/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/products/addproduct", controller.addProduct);
  app.post("/api/products/addbulkproducts", controller.addProductsBulk);
  app.get("/api/products/productstocks", controller.productStockList);
};
