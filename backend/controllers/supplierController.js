const { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier } = require('../models/supplierModel');

const addSupplier = async (req, res) => {
  try {
    const { name, contact_info } = req.body;
    const supplier = await createSupplier(name, contact_info);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listSuppliers = async (req, res) => {
  try {
    const suppliers = await getAllSuppliers();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const modifySupplier = async (req, res) => {
  try {
    const { name, contact_info } = req.body;
    const supplier = await updateSupplier(req.params.id, name, contact_info);
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeSupplier = async (req, res) => {
  try {
    await deleteSupplier(req.params.id);
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addSupplier, listSuppliers, modifySupplier, removeSupplier };