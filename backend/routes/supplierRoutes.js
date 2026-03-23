const express = require('express');
const router = express.Router();
const { addSupplier, listSuppliers, modifySupplier, removeSupplier } = require('../controllers/supplierController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, adminMiddleware, addSupplier);
router.get('/', authMiddleware, listSuppliers);
router.patch('/:id', authMiddleware, adminMiddleware, modifySupplier);
router.delete('/:id', authMiddleware, adminMiddleware, removeSupplier);

module.exports = router;