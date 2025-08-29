const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  domainAuthority: {
    type: Number,
    default: 0
  },
  backlinkCount: {
    type: Number,
    default: 0
  },
  keywords: [{
    type: String
  }],
  niche: {
    type: String
  },
  sitemapUrl: {
    type: String
  },
  lastAnalysis: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Site', siteSchema);