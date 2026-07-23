const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

// Mongo connection try
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://karthikpemmasani7_db_user:Darshan12345@cluster0.9gzg8ft.mongodb.net/darshanease?retryWrites=true&w=majority';
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 }).catch(() => {});
}

// Routes
app.get('/api', (req, res) => res.json({ message: 'DarshanEase API Live' }));
app.use('/api/auth', require('../../server/routes/authRoutes'));
app.use('/api/temples', require('../../server/routes/templeRoutes'));
app.use('/api/bookings', require('../../server/routes/bookingRoutes'));

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Server Error' });
});

module.exports = app;
