const sequelize = require('./config/db');
const User = require('./models/usersModel');
const Supplier = require('./models/supplierModel');
const Medicine = require('./models/medicineModel');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced! All tables dropped and recreated.');

    // Users
    await User.bulkCreate([
  { name: 'Admin', email: 'admin@example.com', password: 'hashedpassword', role: 'admin' },
  { name: 'Staff1', email: 'staff1@example.com', password: 'hashedpassword', role: 'staff' }
    ]);

    // Suppliers
    await Supplier.bulkCreate([
      { name: 'Supplier A', contact_info: 'contact@a.com' },
      { name: 'Supplier B', contact_info: 'contact@b.com' }
    ]);

    // Medicines
    await Medicine.bulkCreate([
      { name: 'Paracetamol', quantity: 100, threshold: 10, supplierId: 1 },
      { name: 'Amoxicillin', quantity: 50, threshold: 5, supplierId: 2 }
    ]);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();