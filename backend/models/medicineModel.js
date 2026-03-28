const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Supplier = require('./supplierModel');

const Medicine = sequelize.define('Medicine', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
});

// Relation: Medicine belongs to Supplier
Medicine.belongsTo(Supplier, { foreignKey: 'supplierId' });
Supplier.hasMany(Medicine, { foreignKey: 'supplierId' });

module.exports = Medicine;