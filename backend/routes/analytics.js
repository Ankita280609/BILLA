const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authmid');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');

router.use(protect);


router.get('/summary', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const categorySummary = await Subscription.aggregate([
      { $match: { user: userId } }, // Filter by the logged-in user
      {
        $group: {
          _id: '$category',
          totalCost: { $sum: '$cost' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {

          _id: 0,
          category: '$_id',
          totalCost: 1,
          count: 1,
        },
      },
      { $sort: { totalCost: -1 } },
    ]);


    const monthlyTotal = await Subscription.aggregate([
      {
        $match: {
          user: userId,
          billingCycle: 'Monthly',
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    const yearlyTotal = await Subscription.aggregate([
      {
        $match: {
          user: userId,
          billingCycle: 'Yearly',
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    // Calculate Paid vs Unpaid for current month (Monthly subscriptions only)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const paidMonthly = await Subscription.aggregate([
      {
        $match: {
          user: userId,
          billingCycle: 'Monthly',
          lastPaidDate: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' }
        }
      }
    ]);

    const totalMonthlyCost = monthlyTotal.length > 0 ? monthlyTotal[0].total : 0;
    const totalPaid = paidMonthly.length > 0 ? paidMonthly[0].total : 0;
    const totalUnpaid = totalMonthlyCost - totalPaid;

    res.json({
      byCategory: categorySummary,
      totalMonthly: totalMonthlyCost,
      totalYearly: yearlyTotal.length > 0 ? yearlyTotal[0].total : 0,
      totalPaid: totalPaid,
      totalUnpaid: totalUnpaid,
      totalSubscriptions: await Subscription.countDocuments({ user: userId }),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;