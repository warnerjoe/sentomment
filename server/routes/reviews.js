const express = require('express');
const axios = require('axios');
const Review = require('../models/Review');
const router = express.Router();

// POST route to submit a review
router.post('/submit', async (req, res) => {
  const { reviewText } = req.body;
  console.log(reviewText)
  try {
    // Send review text to the Python microservice
    const response = await axios.post(process.env.SENTIMENT_API_URL, { review: reviewText });

    const { sentiment, score } = response.data;

    // Save to MongoDB
    const newReview = new Review({
      reviewText,
      sentiment,
      score
    });

    await newReview.save();

    res.status(200).json({ message: 'Review analyzed and saved!', data: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing review' });
  }
});

module.exports = router;
