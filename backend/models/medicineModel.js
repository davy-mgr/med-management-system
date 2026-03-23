// backend/models/medicineModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Supplier = require('./supplierModel');

const Medicine = sequelize.define('Medicine', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  unit: { type: DataTypes.STRING, defaultValue: 'tablet' },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

// Relation to Supplier
Medicine.belongsTo(Supplier, { foreignKey: 'supplier_id', onDelete: 'SET NULL' });

module.exports = Medicine;