const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan('dev'));

// MongoDB Connection
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/darshanease', {
    serverSelectionTimeoutMS: 3000,
  }).catch((err) => console.log('MongoDB connection fallback active:', err.message));
}

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'DarshanEase Backend API is running serverlessly on Vercel!' });
});

// Routes
app.use('/api/auth', require('../DarshanEase/server/routes/authRoutes'));
app.use('/api/temples', require('../DarshanEase/server/routes/templeRoutes'));
app.use('/api/bookings', require('../DarshanEase/server/routes/bookingRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

module.exports = app;
