const express = require('express');
const router = express.Router();
const { addMedicine, listMedicines, modifyMedicine, removeMedicine } = require('../controllers/medicineController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, adminMiddleware, addMedicine);
router.get('/', authMiddleware, listMedicines);
router.patch('/:id', authMiddleware, adminMiddleware, modifyMedicine);
router.delete('/:id', authMiddleware, adminMiddleware, removeMedicine);

module.exports = router;