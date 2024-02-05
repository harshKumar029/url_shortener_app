const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  url: [{
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true }
  }],
  pastAnalytics: [{
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Shorturl', urlSchema);