require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const stockTransactionRoutes = require('./routes/stockTransactionRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/transactions', stockTransactionRoutes);
app.use('/medicines', medicineRoutes);


// Test DB connection and sync models before starting server
sequelize.authenticate()
  .then(async () => {
    console.log('DB connected ✅');
    // TEMP: Sync all models to create missing tables (do not use force!)
    await sequelize.sync();
    console.log('DB synced (tables ensured)');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((err) => {
    console.error('DB connection error ❌', err);
  });