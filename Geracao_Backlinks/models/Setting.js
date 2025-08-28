const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'dark'
  },
  primaryColor: {
    type: String,
    default: '#FF7A00'
  },
  secondaryColor: {
    type: String,
    default: '#000000'
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  privacy: {
    profileVisibility: {
      type: String,
      enum: ['public', 'private', 'friends'],
      default: 'private'
    },
    dataSharing: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Setting', settingSchema);