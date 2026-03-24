// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const usersRoutes = require('./routes/usersRoutes');
const medicinesRoutes = require('./routes/medicineRoutes');

app.use('/users', usersRoutes);
app.use('/medicines', medicinesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));