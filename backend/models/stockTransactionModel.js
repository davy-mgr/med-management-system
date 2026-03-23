// backend/models/stockTransactionsModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Medicine = require('./medicinesModel');
const User = require('./usersModel');

const StockTransaction = sequelize.define('StockTransaction', {
  transaction_type: { type: DataTypes.STRING, allowNull: false }, // 'in' or 'out'
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  note: DataTypes.TEXT
}, { timestamps: true });

// Relations
StockTransaction.belongsTo(Medicine, { foreignKey: 'medicine_id', onDelete: 'CASCADE' });
StockTransaction.belongsTo(User, { foreignKey: 'user_id', onDelete: 'SET NULL' });

module.exports = StockTransaction;