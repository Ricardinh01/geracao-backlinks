const path = require('path');
const express = require('express');
const session = require('express-session');
const { registerUser, loginUser } = require('../services/auth');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Rota de registro (com async)
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    
    const user = await registerUser(username, password);
    req.session.userId = user.id;
    res.json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota de login (com async)
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    
    const user = await loginUser(username, password);
    req.session.userId = user.id;
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Dashboard', userId: req.session.userId });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao fazer logout' });
    }
    res.clearCookie('connect.sid'); // Nome padrão do cookie de sessão
    res.json({ message: 'Logout realizado com sucesso' });
  });
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});