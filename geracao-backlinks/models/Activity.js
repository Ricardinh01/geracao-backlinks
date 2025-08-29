const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  targetType: {
    type: String,
    enum: ['site', 'backlink', 'keyword', 'profile']
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', activitySchema);