const controller = require("../../controllers/category/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/categories/addcategory", controller.addCategory);
  app.post("/api/categories/wholesaler", controller.getWholesalerCategories);
};
