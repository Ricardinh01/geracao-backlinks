const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  keyword: {
    type: String,
    required: true
  },
  volume: {
    type: Number,
    default: 0
  },
  competition: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  position: {
    type: Number
  },
  competitiveness: {
    type: Number,
    default: 0
  },
  competitorBacklinks: {
    type: Number,
    default: 0
  },
  competitorTopics: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Keyword', keywordSchema);