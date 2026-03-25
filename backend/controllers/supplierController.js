// backend/controllers/supplierController.js
const Supplier = require('../models/supplierModel'); // Sequelize model

// Add supplier
const addSupplier = async (req, res) => {
  try {
    const { name, contact_email, phone_number, address } = req.body;
    const supplier = await Supplier.create({ name, contact_email, phone_number, address });
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all suppliers
const listSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update supplier
const modifySupplier = async (req, res) => {
  try {
    const { name, contact_email, phone_number, address } = req.body;
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    await supplier.update({ name, contact_email, phone_number, address });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete supplier
const removeSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    await supplier.destroy();
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addSupplier, listSuppliers, modifySupplier, removeSupplier };