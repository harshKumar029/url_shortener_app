const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  url: [{
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true },
    pastAnalytics: [{
      timestamp: {  type: Number }
    }]
  }],
});

module.exports = mongoose.model('Shorturl', urlSchema);