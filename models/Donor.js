const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A', 'B', 'O', 'AB'],
  },
  rhFactor: {
    type: String,
    required: true,
    enum: ['+', '-'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donor', DonorSchema);