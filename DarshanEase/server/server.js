const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('DarshanEase Backend API is running!');
});


// Database Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/darshanease')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/temples', require('./routes/templeRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
// Generic Admin Stats route (optional enhancement)
app.get('/api/admin/stats', require('./middleware/authMiddleware').protect, require('./middleware/adminMiddleware').admin, async (req, res) => {
  try {
    const usersCount = await mongoose.model('User').countDocuments();
    const templesCount = await mongoose.model('Temple').countDocuments();
    const bookingsCount = await mongoose.model('Booking').countDocuments();
    res.json({ usersCount, templesCount, bookingsCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
