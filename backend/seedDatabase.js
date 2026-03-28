require('dotenv').config();
const sequelize = require('./config/db');
const User = require('./models/userModel');
const Supplier = require('./models/supplierModel');
const Medicine = require('./models/medicineModel');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const adminPassword = await bcrypt.hash('admin123', 10);
    const staffPassword = await bcrypt.hash('staff123', 10);

    await User.bulkCreate([
      { name: 'Admin', email: 'admin@example.com', password: adminPassword, role: 'admin' },
      { name: 'Staff1', email: 'staff1@example.com', password: staffPassword, role: 'staff' },
      { name: 'Staff2', email: 'staff2@example.com', password: staffPassword, role: 'staff' },
      { name: 'Pharmacist', email: 'pharma@example.com', password: staffPassword, role: 'pharmacist' },
      { name: 'Technician', email: 'tech@example.com', password: staffPassword, role: 'technician' }
    ]);


    await Supplier.bulkCreate([
      { name: 'HealthSource Inc.', contact_email: 'orders@healthsource.com', phone_number: '555-1234', address: '123 Main St, Cityville' },
      { name: 'MediPlus Supplies', contact_email: 'sales@mediplus.com', phone_number: '555-5678', address: '456 Oak Ave, Townsville' },
      { name: 'PharmaDirect', contact_email: 'info@pharmadirect.com', phone_number: '555-8765', address: '789 Pine Rd, Villagetown' },
      { name: 'GlobalMed', contact_email: 'contact@globalmed.com', phone_number: '555-4321', address: '321 Maple Blvd, Metropolis' },
      { name: 'Wellness Partners', contact_email: 'hello@wellnesspartners.com', phone_number: '555-2222', address: '22 Wellness Way, Healthtown' },
      { name: 'CarePlus Pharma', contact_email: 'support@careplus.com', phone_number: '555-3333', address: '33 Care St, Medcity' }
    ]);


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

    const { logTransaction } = require('./models/stockTransactionModel');
    await logTransaction(1, 1, 20, 'in', 'Initial stock received');
    await logTransaction(2, 2, 10, 'in', 'Restock');
    await logTransaction(3, 3, 5, 'out', 'Dispensed to patient');
    await logTransaction(4, 4, 15, 'in', 'Supplier delivery');
    await logTransaction(5, 5, 3, 'out', 'Sample usage');
    await logTransaction(1, 2, 7, 'out', 'Dispensed to patient');
    await logTransaction(2, 1, 8, 'in', 'Emergency restock');
    await logTransaction(3, 3, 2, 'out', 'Expired stock removed');
    await logTransaction(4, 4, 12, 'in', 'Routine delivery');
    await logTransaction(5, 5, 6, 'out', 'Dispensed to patient');

    console.log('Seeding complete!');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();