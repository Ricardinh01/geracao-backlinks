const express = require('express');
const Site = require('../models/Site');
const Backlink = require('../models/Backlink');
const Keyword = require('../models/Keyword');
const Activity = require('../models/Activity');

const router = express.Router();

// Middleware to verify token (simplified for this example)
const verifyToken = (req, res, next) => {
  // In a real implementation, you would verify the JWT token
  // For now, we'll just add a dummy userId
  req.userId = 'dummy-user-id';
  next();
};

// Get dashboard data
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    // Get counts
    const siteCount = await Site.countDocuments({ userId: req.userId });
    const backlinkCount = await Backlink.countDocuments({ userId: req.userId });
    const keywordCount = await Keyword.countDocuments({ userId: req.userId });
    
    // Get recent activities
    const recentActivities = await Activity.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(5);
    
    // Get backlink status distribution
    const statusDistribution = await Backlink.aggregate([
      { $match: { userId: req.userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    res.json({
      stats: {
        sites: siteCount,
        backlinks: backlinkCount,
        keywords: keywordCount
      },
      recentActivities,
      statusDistribution
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do dashboard' });
  }
});

// Get site analytics
router.get('/sites/:id', verifyToken, async (req, res) => {
  try {
    const site = await Site.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!site) {
      return res.status(404).json({ message: 'Site não encontrado' });
    }
    
    // Get backlinks for this site
    const backlinks = await Backlink.find({ siteId: site._id });
    
    // Get keywords for this site
    const keywords = await Keyword.find({ siteId: site._id });
    
    res.json({
      site,
      backlinkCount: backlinks.length,
      keywordCount: keywords.length,
      backlinks,
      keywords
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar análises do site' });
  }
});

module.exports = router;