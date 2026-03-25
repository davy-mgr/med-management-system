const express = require('express');
const router = express.Router();
const { addSupplier, listSuppliers, modifySupplier, removeSupplier } = require('../controllers/supplierController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, adminMiddleware, addSupplier); // only admins
router.get('/', authMiddleware, listSuppliers); // any logged-in user
router.patch('/:id', authMiddleware, adminMiddleware, modifySupplier);
router.delete('/:id', authMiddleware, adminMiddleware, removeSupplier);

module.exports = router;