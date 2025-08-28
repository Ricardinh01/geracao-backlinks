const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/backlinks_saas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', require('./api/auth'));
app.use('/api/sites', require('./api/sites'));
app.use('/api/backlinks', require('./api/backlinks'));
app.use('/api/keywords', require('./api/keywords'));
app.use('/api/settings', require('./api/settings'));
app.use('/api/analytics', require('./api/analytics'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Sistema de Geração de Backlinks está funcionando!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;