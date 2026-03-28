const Medicine = require('../models/medicineModel');


const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addMedicine = async (req, res) => {
  try {
    const { name, description, quantity } = req.body;
    const med = await Medicine.create({ name, description, quantity });
    res.status(201).json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByPk(req.params.id);
    if (!med) return res.status(404).json({ message: 'Not found' });
    await med.update(req.body);
    res.json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByPk(req.params.id);
    if (!med) return res.status(404).json({ message: 'Not found' });
    await med.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllMedicines, addMedicine, updateMedicine, deleteMedicine };