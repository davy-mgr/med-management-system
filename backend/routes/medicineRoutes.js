// backend/routes/medicinesRoutes.js
const express = require('express');
const router = express.Router();
const medicinesController = require('../controllers/medicinesController');

router.get('/', medicinesController.getAllMedicines);
router.post('/', medicinesController.addMedicine);
router.put('/:id', medicinesController.updateMedicine);
router.delete('/:id', medicinesController.deleteMedicine);
router.get('/low-stock', medicinesController.getLowStock);

module.exports = router;