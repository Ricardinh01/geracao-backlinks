const express = require('express');
const Backlink = require('../models/Backlink');
const Activity = require('../models/Activity');

const router = express.Router();

// Middleware to verify token (simplified for this example)
const verifyToken = (req, res, next) => {
  // In a real implementation, you would verify the JWT token
  // For now, we'll just add a dummy userId
  req.userId = 'dummy-user-id';
  next();
};

// Get all backlinks for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const backlinks = await Backlink.find({ userId: req.userId })
      .populate('siteId', 'url');
    res.json(backlinks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar backlinks' });
  }
});

// Create new backlink
router.post('/', verifyToken, async (req, res) => {
  try {
    const { siteId, targetUrl, anchorText, sourceSite } = req.body;
    
    // Create backlink
    const backlink = new Backlink({
      userId: req.userId,
      siteId,
      targetUrl,
      anchorText,
      sourceSite
    });
    
    await backlink.save();
    
    // Log activity
    const activity = new Activity({
      userId: req.userId,
      action: 'create_backlink',
      description: `Criou backlink para ${targetUrl} no site ${sourceSite}`,
      targetType: 'backlink',
      targetId: backlink._id
    });
    
    await activity.save();
    
    res.status(201).json(backlink);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar backlink' });
  }
});

// Generate article with backlink
router.post('/:id/generate', verifyToken, async (req, res) => {
  try {
    const backlink = await Backlink.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!backlink) {
      return res.status(404).json({ message: 'Backlink não encontrado' });
    }
    
    // Simulate article generation (would take 40-50 seconds in real implementation)
    // In a real implementation, you would generate the article content here
    backlink.articleTitle = `Artigo sobre ${backlink.anchorText}`;
    backlink.status = 'generated';
    await backlink.save();
    
    // Log activity
    const activity = new Activity({
      userId: req.userId,
      action: 'generate_article',
      description: `Gerou artigo com backlink para ${backlink.targetUrl}`,
      targetType: 'backlink',
      targetId: backlink._id
    });
    
    await activity.save();
    
    res.json({ message: 'Artigo gerado com sucesso', backlink });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar artigo' });
  }
});

// Publish backlink
router.post('/:id/publish', verifyToken, async (req, res) => {
  try {
    const backlink = await Backlink.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!backlink) {
      return res.status(404).json({ message: 'Backlink não encontrado' });
    }
    
    // Simulate publishing
    backlink.status = 'published';
    backlink.publishedAt = new Date();
    backlink.articleUrl = `https://${backlink.sourceSite}/artigo-${Date.now()}`;
    await backlink.save();
    
    // Log activity
    const activity = new Activity({
      userId: req.userId,
      action: 'publish_backlink',
      description: `Publicou backlink em ${backlink.sourceSite}`,
      targetType: 'backlink',
      targetId: backlink._id
    });
    
    await activity.save();
    
    res.json({ message: 'Backlink publicado com sucesso', backlink });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao publicar backlink' });
  }
});

module.exports = router;