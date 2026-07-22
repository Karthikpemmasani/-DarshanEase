const Booking = require('../models/Booking');
const Temple = require('../models/Temple');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const addBooking = async (req, res) => {
  try {
    const { templeId, date, slot, name, aadharNumber } = req.body;

    if (!templeId || !date || !slot || !name || !aadharNumber) {
      return res.status(400).json({ message: 'Please provide all required fields (templeId, date, slot, name, aadharNumber)' });
    }

    // Generate random ticket number
    const ticketNumber = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const booking = new Booking({
      userId: req.user._id,
      templeId,
      date,
      slot,
      ticketNumber,
      name,
      aadharNumber,
    });

    const createdBooking = await booking.save();

    // Decrease available slots in the temple
    const temple = await Temple.findById(templeId);
    if (temple && temple.availableSlots > 0) {
      temple.availableSlots -= 1;
      await temple.save();
    }

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('templeId', 'name location image');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/admin
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('userId', 'name email').populate('templeId', 'name');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      // Check if user is the owner or an admin
      if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'User not authorized' });
      }

      booking.status = 'cancelled';
      await booking.save();

      // Restore slot
      const temple = await Temple.findById(booking.templeId);
      if (temple) {
        temple.availableSlots += 1;
        await temple.save();
      }

      res.json({ message: 'Booking cancelled successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
};
