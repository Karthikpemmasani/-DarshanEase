const express = require('express');
const router = express.Router();
const {
  addBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
  .post(protect, addBooking)
  .get(protect, getMyBookings);

router.route('/admin')
  .get(protect, admin, getAllBookings);

router.route('/:id')
  .delete(protect, cancelBooking);

module.exports = router;
