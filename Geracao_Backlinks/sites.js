const express = require('express');
const Site = require('../models/Site');
const Activity = require('../models/Activity');

const router = express.Router();

// Middleware to verify token (simplified for this example)
const verifyToken = (req, res, next) => {
  // In a real implementation, you would verify the JWT token
  // For now, we'll just add a dummy userId
  req.userId = 'dummy-user-id';
  next();
};

// Get all sites for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const sites = await Site.find({ userId: req.userId });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar sites' });
  }
});

// Add new site
router.post('/', verifyToken, async (req, res) => {
  try {
    const { url } = req.body;
    
    // Check if site already exists for this user
    const existingSite = await Site.findOne({ userId: req.userId, url });
    if (existingSite) {
      return res.status(400).json({ message: 'Site já cadastrado' });
    }
    
    // Create site
    const site = new Site({
      userId: req.userId,
      url
    });
    
    await site.save();
    
    // Log activity
    const activity = new Activity({
      userId: req.userId,
      action: 'add_site',
      description: `Adicionou o site ${url}`,
      targetType: 'site',
      targetId: site._id
    });
    
    await activity.save();
    
    res.status(201).json(site);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar site' });
  }
});

// Delete site
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const site = await Site.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    
    if (!site) {
      return res.status(404).json({ message: 'Site não encontrado' });
    }
    
    // Log activity
    const activity = new Activity({
      userId: req.userId,
      action: 'delete_site',
      description: `Removeu o site ${site.url}`,
      targetType: 'site',
      targetId: site._id
    });
    
    await activity.save();
    
    res.json({ message: 'Site removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover site' });
  }
});

// Analyze site (sitemap parsing)
router.post('/:id/analyze', verifyToken, async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!site) {
      return res.status(404).json({ message: 'Site não encontrado' });
    }
    
    // In a real implementation, you would parse the sitemap here
    // For now, we'll simulate the analysis
    site.niche = 'Tecnologia';
    site.lastAnalysis = new Date();
    await site.save();
    
    // Log activity
    const activity = new Activity({
      userId: req.userId,
      action: 'analyze_site',
      description: `Analisou o site ${site.url}`,
      targetType: 'site',
      targetId: site._id
    });
    
    await activity.save();
    
    res.json({ message: 'Análise concluída', site });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao analisar site' });
  }
});

module.exports = router;