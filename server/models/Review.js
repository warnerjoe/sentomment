const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewText: { type: String, required: true },
  sentiment: { type: String, enum: ['Positive', 'Neutral', 'Negative'], required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
