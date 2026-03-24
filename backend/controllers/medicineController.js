// backend/controllers/medicinesController.js
const Medicine = require('../models/medicineModel');
const Supplier = require('../models/supplierModel');
const { Op } = require('sequelize');
const LOW_STOCK_THRESHOLD = 10;

// Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll({ include: ['Supplier'] });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all medicines WITH low stock status
exports.getMedicinesWithStockStatus = async (req, res) => {
  try {
    const medicines = await Medicine.findAll({ include: { model: Supplier, as: 'supplier' } });

    const result = medicines.map((med) => ({
      ...med.toJSON(),
      isLowStock: med.quantity <= (med.threshold || 5)
    }));

    res.json(result);
  } catch (err) {
    console.error(err); // log the real error
    res.status(500).json({ error: err.message });
  }
};

// Add a new medicine
exports.addMedicine = async (req, res) => {
  try {
    const med = await Medicine.create(req.body);
    res.status(201).json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update medicine
exports.updateMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByPk(req.params.id);
    if (!med) return res.status(404).json({ message: 'Medicine not found' });

    await med.update(req.body);

    if (med.quantity < LOW_STOCK_THRESHOLD) {
      console.log(`ALERT: Medicine "${med.name}" is low. Current quantity: ${med.quantity}`);
    }

    res.json(med);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByPk(req.params.id);
    if (!med) return res.status(404).json({ message: 'Medicine not found' });
    await med.destroy();
    res.json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get low stock medicines
exports.getLowStock = async (req, res) => {
  try {
    const lowStock = await Medicine.findAll({
      where: { quantity: { [Op.lt]: LOW_STOCK_THRESHOLD } }
    });
    res.json(lowStock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};