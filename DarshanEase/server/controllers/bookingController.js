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

module.exports = {
  addBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
};

