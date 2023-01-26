const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.wholesaler = require("./wholesalerModel");
db.retailer = require("./retailerModel");
db.product = require("./productModel");
db.category = require("./categoryModel");
db.brand = require("./brandModel");
db.orders = require("./ordersModel");
db.assignedStocks = require("./assignedStocksModel");
db.wholesalerLogin = require("./wholesalerLoginModel");
db.warehouse = require("./warehouseModel");
db.retailerLogin = require("./retailerLoginModel");
module.exports = db;
