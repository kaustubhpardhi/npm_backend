const mongoose = require("mongoose");

const roleList = new mongoose.Schema({
  name: String, // name of the role (e.g. "admin", "superadmin", "manager")
  permissions: [
    String, // name of the permission (e.g. "create_products", "view_orders","read","write","update")
  ],
});

const RoleList = mongoose.model("RoleList", roleList);
module.exports = { RoleList };
