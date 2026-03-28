const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Medicine = require('./medicineModel');
const User = require('./userModel');

const StockTransaction = sequelize.define('StockTransaction', {
  transaction_type: { type: DataTypes.STRING, allowNull: false }, // 'in' or 'out'
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  note: DataTypes.TEXT
}, { timestamps: true });

// Relations
StockTransaction.belongsTo(Medicine, { foreignKey: 'medicine_id', onDelete: 'CASCADE' });
StockTransaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'SET NULL' });


// Helper: Log a new transaction
async function logTransaction(medicine_id, user_id, quantity, transaction_type, note = null) {
  return await StockTransaction.create({
    medicine_id,
    user_id,
    quantity,
    transaction_type,
    note
  });
}

// Helper: Get all transactions, or by medicine
async function getTransactionsByMedicine(medicine_id = null) {
  const where = medicine_id ? { medicine_id } : {};
  return await StockTransaction.findAll({
    where,
    include: [Medicine, User],
    order: [['createdAt', 'DESC']]
  });
}

module.exports = { StockTransaction, logTransaction, getTransactionsByMedicine };