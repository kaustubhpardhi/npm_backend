const controller = require("../../controllers/brand/brand.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/brands/addbrand", controller.addBrand);
  app.get("/api/brands", controller.getAllBrandNames);
};
