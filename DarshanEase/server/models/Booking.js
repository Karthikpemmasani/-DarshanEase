const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  templeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: String,
    required: true,
  },
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked',
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
