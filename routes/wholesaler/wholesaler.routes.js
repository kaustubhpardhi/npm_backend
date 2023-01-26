const controller = require("../../controllers/wholesaler/wholesaler.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/wholesalers/addwholesaler", controller.addWholesaler);
  app.post("/api/wholesalers/wholesaler", controller.getWholesalerById);
  app.get("/api/wholesalers", controller.getAllWholesaler);
  app.post("/api/wholesaler/login", controller.login);
};
