const controller = require("../../controllers/npm/npm.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/npm/wholesalersignup", controller.wholesalerSignup);
  app.post("/api/npm/retailersignup", controller.retailerSignup);
};
