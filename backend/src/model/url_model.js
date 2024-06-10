// const mongoose = require('mongoose');

// const urlSchema = new mongoose.Schema({
//   userEmail: { type: String, required: true },
//   url: [{
//     originalURL: { type: String, required: true },
//     shortURL: { type: String, required: true },
//     pastAnalytics: [{
//       timestamp: {  type: Number }
//     }]
//   }],
// });

// module.exports = mongoose.model('Shorturl', urlSchema);


const mongoose = require('mongoose');

const pastAnalyticsSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  location: { type: Object, default: {} },
  ip: { type: String, default: '' },
  device: {
    browser: { type: String, default: '' },
    os: { type: String, default: '' },
    device: { type: String, default: '' }
  }
});

const urlSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  url: [{
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true },
    pastAnalytics: [pastAnalyticsSchema]
  }]
});

module.exports = mongoose.model('Shorturl', urlSchema);
