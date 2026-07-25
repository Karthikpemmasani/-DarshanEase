const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Temple = require('../models/Temple');
const memoryStore = require('../utils/memoryStore');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const addBooking = async (req, res) => {
  try {
    const { templeId, date, slot, name, aadharNumber } = req.body;

    if (!templeId || !date || !slot || !name || !aadharNumber) {
      return res.status(400).json({ message: 'Please provide all required fields (templeId, date, slot, name, aadharNumber)' });
    }

    let createdBooking = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const ticketNumber = 'TKT-' + Math.random().toString(36).substring(2, 11).toUpperCase();
        const booking = new Booking({
          userId: req.user._id,
          templeId,
          date,
          slot,
          ticketNumber,
          name,
          aadharNumber,
        });

        createdBooking = await booking.save();

        const temple = await Temple.findById(templeId);
        if (temple && temple.availableSlots > 0) {
          temple.availableSlots -= 1;
          await temple.save();
        }
      } catch (err) {
        console.log('MongoDB addBooking error, using memoryStore:', err.message);
      }
    }

    if (!createdBooking) {
      createdBooking = memoryStore.createBooking({
        userId: req.user._id,
        templeId,
        date,
        slot,
        name,
        aadharNumber,
      });
    }

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Booking failed' });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings
// @access  Private
const getMyBookings = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const bookings = await Booking.find({ userId: req.user._id }).populate('templeId', 'name location image');
      return res.json(bookings);
    } catch (err) {
      console.log('MongoDB getMyBookings error, using memoryStore:', err.message);
    }
  }

  const bookings = memoryStore.getUserBookings(req.user._id);
  res.json(bookings);
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/admin
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const bookings = await Booking.find({}).populate('userId', 'name email').populate('templeId', 'name');
      return res.json(bookings);
    } catch (err) {
      console.log('MongoDB getAllBookings error, using memoryStore:', err.message);
    }
  }

  const bookings = memoryStore.getAllBookings();
  res.json(bookings);
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const booking = await Booking.findById(req.params.id);
      if (booking) {
        const bookingDate = new Date(booking.date);
        bookingDate.setHours(23, 59, 59, 999);
        if (bookingDate < new Date()) {
          return res.status(400).json({ message: 'Expired ticket for past date cannot be cancelled' });
        }

        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
          return res.status(401).json({ message: 'User not authorized' });
        }
        booking.status = 'cancelled';
        await booking.save();

        const temple = await Temple.findById(booking.templeId);
        if (temple) {
          temple.availableSlots += 1;
          await temple.save();
        }
        return res.json({ message: 'Booking cancelled successfully' });
      }
    } catch (err) {
      console.log('MongoDB cancelBooking error, using memoryStore:', err.message);
    }
  }

  const result = memoryStore.cancelBooking(req.params.id, req.user._id, req.user.role);
  if (result.success) {
    res.json({ message: 'Booking cancelled successfully' });
  } else if (result.error === 'Expired ticket') {
    res.status(400).json({ message: 'Expired ticket for past date cannot be cancelled' });
  } else if (result.error === 'Not authorized') {
    res.status(401).json({ message: 'User not authorized' });
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

// @desc    Sync booking publicly from any device
// @route   POST /api/bookings/public-sync
// @access  Public
const syncPublicBooking = async (req, res) => {
  try {
    const { templeId, date, slot, name, aadharNumber, ticketNumber, status, _id } = req.body;
    if (!name || !aadharNumber) {
      return res.status(400).json({ message: 'Name and Aadhar are required' });
    }

    const tNo = ticketNumber || 'TKT-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    const bId = _id || 'bkg_' + Date.now() + Math.random().toString(36).substring(2, 6);

    const newBookingData = {
      _id: bId,
      userId: req.user?._id || 'usr_public_' + Date.now(),
      templeId: templeId || { name: 'Tirumala Venkateswara Temple', location: 'Tirupati, AP' },
      date: date ? new Date(date) : new Date(),
      slot: slot || 'Morning Aarti (06:00 AM - 08:00 AM)',
      name,
      aadharNumber,
      ticketNumber: tNo,
      status: status || 'booked',
      createdAt: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const existing = await Booking.findOne({ ticketNumber: tNo });
        if (existing) {
          if (status) existing.status = status;
          await existing.save();
          return res.json(existing);
        }
        const booking = new Booking(newBookingData);
        await booking.save();
        return res.status(201).json(booking);
      } catch (err) {
        console.log('MongoDB syncPublicBooking error, using memoryStore:', err.message);
      }
    }

    const synced = memoryStore.createBooking(newBookingData);
    res.status(201).json(synced);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all public bookings across devices
// @route   GET /api/bookings/public-sync
// @access  Public
const getPublicBookings = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const bookings = await Booking.find({}).populate('userId', 'name email').populate('templeId', 'name');
      return res.json(bookings);
    } catch (err) {
      console.log('MongoDB getPublicBookings error:', err.message);
    }
  }
  const bookings = memoryStore.getAllBookings();
  res.json(bookings);
};

module.exports = {
  addBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  syncPublicBooking,
  getPublicBookings,
};

