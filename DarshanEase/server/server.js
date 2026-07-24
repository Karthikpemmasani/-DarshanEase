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
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/darshanease', {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error (Fallback in-memory mode active):', err.message));


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/temples', require('./routes/templeRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.get('/api/admin/stats', require('./middleware/authMiddleware').protect, require('./middleware/adminMiddleware').admin, async (req, res) => {
  try {
    let usersCount = 0;
    let templesCount = 0;
    let bookingsCount = 0;

    if (mongoose.connection.readyState === 1) {
      try {
        usersCount = await mongoose.model('User').countDocuments();
        templesCount = await mongoose.model('Temple').countDocuments();
        bookingsCount = await mongoose.model('Booking').countDocuments();
      } catch (err) {
        console.log('MongoDB stats error, falling back:', err.message);
      }
    }

    if (usersCount === 0 && templesCount === 0) {
      const memoryStore = require('./utils/memoryStore');
      usersCount = memoryStore.users.length;
      templesCount = memoryStore.temples.length;
      bookingsCount = memoryStore.bookings.length;
    }

    res.json({ usersCount, templesCount, bookingsCount });
  } catch (error) {
    const memoryStore = require('./utils/memoryStore');
    res.json({
      usersCount: memoryStore.users.length,
      templesCount: memoryStore.temples.length,
      bookingsCount: memoryStore.bookings.length,
    });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

