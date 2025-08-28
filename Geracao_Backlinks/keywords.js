const express = require('express');
const Keyword = require('../models/Keyword');
const Site = require('../models/Site');

const router = express.Router();

// Middleware to verify token (simplified for this example)
const verifyToken = (req, res, next) => {
  // In a real implementation, you would verify the JWT token
  // For now, we'll just add a dummy userId
  req.userId = 'dummy-user-id';
  next();
};

// Get all keywords for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const keywords = await Keyword.find({ userId: req.userId })
      .populate('siteId', 'url');
    res.json(keywords);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar palavras-chave' });
  }
});

// Add keywords to site
router.post('/site/:siteId', verifyToken, async (req, res) => {
  try {
    const { keywords } = req.body;
    
    // Verify site belongs to user
    const site = await Site.findOne({ _id: req.params.siteId, userId: req.userId });
    if (!site) {
      return res.status(404).json({ message: 'Site não encontrado' });
    }
    
    // Add keywords
    const keywordDocs = keywords.map(keyword => ({
      userId: req.userId,
      siteId: req.params.siteId,
      keyword
    }));
    
    await Keyword.insertMany(keywordDocs);
    
    // Update site with keywords
    site.keywords = keywords;
    await site.save();
    
    res.status(201).json({ message: 'Palavras-chave adicionadas com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar palavras-chave' });
  }
});

// Get keyword analysis
router.get('/:id/analysis', verifyToken, async (req, res) => {
  try {
    const keyword = await Keyword.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!keyword) {
      return res.status(404).json({ message: 'Palavra-chave não encontrada' });
    }
    
    // In a real implementation, you would fetch this data from SEO tools
    // For now, we'll simulate the analysis
    keyword.volume = Math.floor(Math.random() * 10000) + 1000;
    keyword.competition = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];
    keyword.competitiveness = Math.floor(Math.random() * 100);
    keyword.competitorBacklinks = Math.floor(Math.random() * 5000);
    keyword.competitorTopics = [
      'Tópico relacionado 1',
      'Tópico relacionado 2',
      'Tópico relacionado 3'
    ];
    
    await keyword.save();
    
    res.json({ keyword });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao analisar palavra-chave' });
  }
});

module.exports = router;