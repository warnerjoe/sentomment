const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/reviews', reviewRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
