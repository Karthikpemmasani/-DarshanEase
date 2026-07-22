const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Temple name is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  availableSlots: {
    type: Number,
    required: [true, 'Available slots are required'],
    min: 0,
  },
  poojaTypes: [{
    type: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema);
