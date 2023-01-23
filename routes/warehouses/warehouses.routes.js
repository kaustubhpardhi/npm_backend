const controller = require("../../controllers/warehouse/warehouse.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/warehouses/addwarehouse", controller.addWarehouse);
  app.post("/api/warehouses/wholesaler", controller.getWholesalerWarehouses);
};
