const express = require('express');
const router = express.Router();
const medicinesController = require('../controllers/medicineController');

router.get('/', medicinesController.getAllMedicines);
router.post('/', medicinesController.addMedicine);
router.put('/:id', medicinesController.updateMedicine);
router.delete('/:id', medicinesController.deleteMedicine);
router.get('/low-stock', medicinesController.getLowStock); // optional
router.get('/stock-status', medicinesController.getMedicinesWithStockStatus);

module.exports = router;