// backend/models/supplierModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Supplier = sequelize.define('Supplier', {
  name: { type: DataTypes.STRING, allowNull: false },
  contact_email: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  address: DataTypes.TEXT
}, { timestamps: true });

module.exports = Supplier;