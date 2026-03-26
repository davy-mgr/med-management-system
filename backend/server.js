require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/users', require('./routes/usersRoutes'));
app.use('/suppliers', require('./routes/supplierRoutes'));
app.use('/medicines', require('./routes/medicineRoutes'));
app.use('/auth', authRoutes);
app.use(helmet());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler (generic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

sequelize.authenticate()
  .then(() => console.log('DB connected ✅'))
  .catch(err => console.error('DB connection error ❌', err));