const express = require('express');
const router = express.Router();
const { addTransaction, listTransactions } = require('../controllers/stockTransactionController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, listTransactions);

module.exports = router;