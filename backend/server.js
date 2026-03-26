require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));

// Routes
app.use('/users', require('./routes/usersRoutes'));
app.use('/suppliers', require('./routes/supplierRoutes'));
app.use('/medicines', require('./routes/medicineRoutes'));

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