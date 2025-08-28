const mongoose = require('mongoose');

const backlinkSchema = new mongoose.Schema({
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
  targetUrl: {
    type: String,
    required: true
  },
  anchorText: {
    type: String,
    required: true
  },
  sourceSite: {
    type: String,
    required: true
  },
  articleTitle: {
    type: String
  },
  articleUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'generated', 'published', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Backlink', backlinkSchema);