const express = require('express');
const Setting = require('../models/Setting');

const router = express.Router();

// Middleware to verify token (simplified for this example)
const verifyToken = (req, res, next) => {
  // In a real implementation, you would verify the JWT token
  // For now, we'll just add a dummy userId
  req.userId = 'dummy-user-id';
  next();
};

// Get user settings
router.get('/', verifyToken, async (req, res) => {
  try {
    let settings = await Setting.findOne({ userId: req.userId });
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = new Setting({ userId: req.userId });
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar configurações' });
  }
});

// Update user settings
router.put('/', verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    
    let settings = await Setting.findOne({ userId: req.userId });
    
    // If no settings exist, create new ones
    if (!settings) {
      settings = new Setting({ userId: req.userId, ...updates });
    } else {
      // Update existing settings
      Object.keys(updates).forEach(key => {
        settings[key] = updates[key];
      });
    }
    
    settings.updatedAt = Date.now();
    await settings.save();
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar configurações' });
  }
});

module.exports = router;