const express = require('express');
const router = express.Router();
const {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple,
} = require('../controllers/templeController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/')
  .get(getTemples)
  .post(protect, admin, createTemple);

router.route('/:id')
  .get(getTempleById)
  .put(protect, admin, updateTemple)
  .delete(protect, admin, deleteTemple);

module.exports = router;
