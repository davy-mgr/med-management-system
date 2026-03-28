const { logTransaction, getTransactionsByMedicine } = require('../models/stockTransactionModel');

const addTransaction = async (req, res) => {
  try {
    const { medicine_id, quantity_change, type } = req.body;
    const transaction = await logTransaction(medicine_id, req.user.id, quantity_change, type);
    res.status(201).json(transaction);
  } catch (err) {
    console.error('Error in addTransaction:', err);
    res.status(500).json({ error: err.message });
  }
};

const listTransactions = async (req, res) => {
  try {
    const { medicine_id } = req.query;
    const transactions = await getTransactionsByMedicine(medicine_id);
    res.json(transactions);
  } catch (err) {
    console.error('Error in listTransactions:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addTransaction, listTransactions };