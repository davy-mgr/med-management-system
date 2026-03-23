// backend/seedDatabase.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const sequelize = require('./config/db');

// Import models (note singular supplierModel)
const User = require('./models/usersModel');
const Supplier = require('./models/supplierModel');
const Medicine = require('./models/medicineModel');

async function seedDatabase() {
  try {
    // Sync all tables (force: true will drop existing tables)
    await sequelize.sync({ force: true });
    console.log('Database synced! All tables dropped and recreated.');

    // -------------------
    // 1. Users
    // -------------------
    const passwordHash = await bcrypt.hash('Abcd@1234', 10);

    const users = await User.bulkCreate([
      { name: 'Admin User', email: 'admin@example.com', password: passwordHash, role: 'admin' },
      { name: 'Pharmacist User', email: 'pharma@example.com', password: passwordHash, role: 'staff' }
    ]);
    console.log(`Seeded ${users.length} users.`);

    // -------------------
    // 2. Suppliers
    // -------------------
    const suppliers = await Supplier.bulkCreate([
      { name: 'HealthCorp Ltd', contact_email: 'contact@healthcorp.com', phone_number: '1234567890', address: 'Nairobi, Kenya' },
      { name: 'MediSupply Inc', contact_email: 'info@medisupply.com', phone_number: '0987654321', address: 'Kigali, Rwanda' }
    ]);
    console.log(`Seeded ${suppliers.length} suppliers.`);

    // -------------------
    // 3. Medicines
    // -------------------
    const medicines = await Medicine.bulkCreate([
      { name: 'Paracetamol 500mg', description: 'Pain and fever relief', unit: 'tablet', quantity: 100, supplier_id: suppliers[0].id },
      { name: 'Amoxicillin 250mg', description: 'Antibiotic', unit: 'capsule', quantity: 50, supplier_id: suppliers[1].id },
      { name: 'Magnesium Sulfate', description: 'Used in maternal care', unit: 'ampoule', quantity: 20, supplier_id: suppliers[0].id }
    ]);
    console.log(`Seeded ${medicines.length} medicines.`);

    console.log('Database seeding completed successfully!');
    process.exit(0); // Exit after seeding
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();