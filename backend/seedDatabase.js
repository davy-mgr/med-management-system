require('dotenv').config();
// backend/seedDatabase.js
const sequelize = require('./config/db');
const User = require('./models/userModel');
const Supplier = require('./models/supplierModel');
const Medicine = require('./models/medicineModel');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced! All tables dropped and recreated.');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const staffPassword = await bcrypt.hash('staff123', 10);


    // Users
    await User.bulkCreate([
      { name: 'Admin', email: 'admin@example.com', password: adminPassword, role: 'admin' },
      { name: 'Staff1', email: 'staff1@example.com', password: staffPassword, role: 'staff' },
      { name: 'Staff2', email: 'staff2@example.com', password: staffPassword, role: 'staff' },
      { name: 'Pharmacist', email: 'pharma@example.com', password: staffPassword, role: 'pharmacist' },
      { name: 'Technician', email: 'tech@example.com', password: staffPassword, role: 'technician' }
    ]);



    // Suppliers
    await Supplier.bulkCreate([
      { name: 'HealthSource Inc.', contact_email: 'orders@healthsource.com', phone_number: '555-1234', address: '123 Main St, Cityville' },
      { name: 'MediPlus Supplies', contact_email: 'sales@mediplus.com', phone_number: '555-5678', address: '456 Oak Ave, Townsville' },
      { name: 'PharmaDirect', contact_email: 'info@pharmadirect.com', phone_number: '555-8765', address: '789 Pine Rd, Villagetown' },
      { name: 'GlobalMed', contact_email: 'contact@globalmed.com', phone_number: '555-4321', address: '321 Maple Blvd, Metropolis' }
    ]);



    // Medicines
    await Medicine.bulkCreate([
      { name: 'Paracetamol', description: 'Pain reliever and fever reducer', quantity: 100, supplierId: 1 },
      { name: 'Amoxicillin', description: 'Antibiotic for bacterial infections', quantity: 50, supplierId: 2 },
      { name: 'Ibuprofen', description: 'Nonsteroidal anti-inflammatory drug', quantity: 200, supplierId: 1 },
      { name: 'Cetirizine', description: 'Antihistamine for allergies', quantity: 75, supplierId: 3 },
      { name: 'Metformin', description: 'Medication for type 2 diabetes', quantity: 120, supplierId: 4 },
      { name: 'Amlodipine', description: 'Calcium channel blocker for hypertension', quantity: 90, supplierId: 2 },
      { name: 'Omeprazole', description: 'Proton pump inhibitor for acid reflux', quantity: 60, supplierId: 3 },
      { name: 'Atorvastatin', description: 'Statin for lowering cholesterol', quantity: 80, supplierId: 4 },
      { name: 'Azithromycin', description: 'Antibiotic for various infections', quantity: 40, supplierId: 1 },
      { name: 'Lisinopril', description: 'ACE inhibitor for blood pressure', quantity: 110, supplierId: 2 }
    ]);

    console.log('Seeding complete!');
    console.log('Admin → admin@example.com / admin123');
    console.log('Staff → staff1@example.com / staff123');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();