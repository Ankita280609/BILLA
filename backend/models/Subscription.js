const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a subscription name'],
    trim: true,
  },
  cost: {
    type: Number,
    required: [true, 'Please add a cost'],
  },
  billingCycle: {
    type: String,
    enum: ['Monthly', 'Yearly', 'One-time'],
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'General',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  lastPaidDate: {
    type: Date,
    default: null,
  },
  dueDate: {
    type: Date,
    default: null, // For one-time payments
  },
  dueDayOfMonth: {
    type: Number,
    min: 1,
    max: 31,
    default: null, // For recurring payments (1-31)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);