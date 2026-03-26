const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Supplier = require('./supplierModel'); // default export

const Medicine = sequelize.define('Medicine', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  unit: { type: DataTypes.STRING, defaultValue: 'tablet' },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  threshold: { type: DataTypes.INTEGER, defaultValue: 5 },
  supplier_id: { type: DataTypes.INTEGER, allowNull: false } // explicitly define FK
}, { timestamps: true });

// Relations
Medicine.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
Supplier.hasMany(Medicine, { foreignKey: 'supplier_id', as: 'medicines' });

module.exports = Medicine;