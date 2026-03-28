const express = require('express');
const router = express.Router();
const { addMedicine, getAllMedicines, updateMedicine, deleteMedicine } = require('../controllers/medicineController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, adminMiddleware, addMedicine);
router.get('/', authMiddleware, getAllMedicines);
router.patch('/:id', authMiddleware, adminMiddleware, updateMedicine);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMedicine);

module.exports = router;