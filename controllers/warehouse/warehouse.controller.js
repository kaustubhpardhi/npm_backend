const db = require("../../models");
const Warehouse = db.warehouse;
const Wholesaler = db.wholesaler;

exports.addWarehouse = async (req, res) => {
  const { wholesaler_id, name, address, managerName, contact } = req.body;
  try {
    const wholesaler = await Wholesaler.findOne({ id: wholesaler_id });
    if (!wholesaler) {
      res.status(404).send({ error: "Wholesaler not found" });
    }
    const warehouse = new Warehouse({
      name: name,
      address: address,
      managerName: managerName,
      contact: contact,
      wholesaler: wholesaler._id,
    });
    await warehouse.save;
    res.status(200).send({ message: "Warehouse added successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getWholesalerWarehouses = async (req, res) => {
  try {
    const { wholesaler_id } = req.body;
    const wholesaler = await Wholesaler.findOne({ id: wholesaler_id });
    const warehouses = await Warehouse.find({
      wholesaler: { $in: wholesaler._id },
    });
    res.status(200).send({ warehouses: warehouses });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};
