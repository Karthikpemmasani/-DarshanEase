const mongoose = require('mongoose');
const Temple = require('../models/Temple');
const memoryStore = require('../utils/memoryStore');

// @desc    Get all temples
// @route   GET /api/temples
// @access  Public
const getTemples = async (req, res) => {
  const { keyword, state } = req.query;

  if (mongoose.connection.readyState === 1) {
    try {
      const count = await Temple.countDocuments();
      if (count === 0) {
        const memTemples = memoryStore.getTemples();
        await Temple.insertMany(memTemples.map(({ _id, ...rest }) => rest));
      }

      const searchFilter = keyword
        ? { name: { $regex: keyword, $options: 'i' } }
        : {};
      const stateFilter = state ? { state } : {};

      const temples = await Temple.find({ ...searchFilter, ...stateFilter });
      return res.json(temples);
    } catch (err) {
      console.log('MongoDB getTemples error, using memoryStore:', err.message);
    }
  }

  // Memory fallback
  const result = memoryStore.getTemples(keyword, state);
  res.json(result);
};

// @desc    Get temple by ID
// @route   GET /api/temples/:id
// @access  Public
const getTempleById = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const temple = await Temple.findById(req.params.id);
      if (temple) {
        return res.json(temple);
      }
    } catch (err) {
      console.log('MongoDB getTempleById error, using memoryStore:', err.message);
    }
  }

  const temple = memoryStore.getTempleById(req.params.id);
  if (temple) {
    res.json(temple);
  } else {
    res.status(404).json({ message: 'Temple not found' });
  }
};

// @desc    Create a temple
// @route   POST /api/temples
// @access  Public
const createTemple = async (req, res) => {
  let created = null;

  if (mongoose.connection.readyState === 1) {
    try {
      const temple = new Temple(req.body);
      created = await temple.save();
    } catch (err) {
      console.log('MongoDB createTemple error, using memoryStore:', err.message);
    }
  }

  if (!created) {
    created = memoryStore.createTemple(req.body);
  }

  res.status(201).json(created);
};

// @desc    Update a temple
// @route   PUT /api/temples/:id
// @access  Public
const updateTemple = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const temple = await Temple.findById(req.params.id);
      if (temple) {
        Object.assign(temple, req.body);
        const updated = await temple.save();
        return res.json(updated);
      }
    } catch (err) {
      console.log('MongoDB updateTemple error, using memoryStore:', err.message);
    }
  }

  const updated = memoryStore.updateTemple(req.params.id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Temple not found' });
  }
};

// @desc    Delete a temple
// @route   DELETE /api/temples/:id
// @access  Public
const deleteTemple = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const temple = await Temple.findById(req.params.id);
      if (temple) {
        await temple.deleteOne();
        return res.json({ message: 'Temple removed' });
      }
    } catch (err) {
      console.log('MongoDB deleteTemple error, using memoryStore:', err.message);
    }
  }

  const deleted = memoryStore.deleteTemple(req.params.id);
  if (deleted) {
    res.json({ message: 'Temple removed' });
  } else {
    res.status(404).json({ message: 'Temple not found' });
  }
};

module.exports = {
  getTemples,
  getTempleById,
  createTemple,
  updateTemple,
  deleteTemple,
};

