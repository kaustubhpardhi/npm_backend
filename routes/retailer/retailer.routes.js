const controller = require("../../controllers/retailer/retailer.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/retailers/addretailer", controller.addRetailer);
  app.get("/api/retailers", controller.getAllRetailer);
};
