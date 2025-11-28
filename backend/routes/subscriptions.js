const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authmid');
const Subscription = require('../models/Subscription');


router.use(protect);


router.post('/', async (req, res) => {
  try {
    const { name, cost, billingCycle, category, startDate, dueDate, dueDayOfMonth } = req.body;

    const newSubscription = new Subscription({
      name,
      cost,
      billingCycle,
      category,
      startDate,
      dueDate: dueDate || null,
      dueDayOfMonth: dueDayOfMonth || null,
      user: req.user.id,
    });

    const subscription = await newSubscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/', async (req, res) => {
  try {

    const subscriptions = await Subscription.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }

    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.put('/:id', async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }


    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    const { name, cost, billingCycle, category, startDate, dueDate, dueDayOfMonth } = req.body;
    const updatedFields = {
      name: name || subscription.name,
      cost: cost !== undefined ? cost : subscription.cost,
      billingCycle: billingCycle || subscription.billingCycle,
      category: category || subscription.category,
      startDate: startDate || subscription.startDate,
      dueDate: dueDate !== undefined ? dueDate : subscription.dueDate,
      dueDayOfMonth: dueDayOfMonth !== undefined ? dueDayOfMonth : subscription.dueDayOfMonth,
    };

    subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }

    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Subscription removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/subscriptions/:id/pay
// @desc    Mark subscription as paid for current cycle
// @access  Private
router.put('/:id/pay', async (req, res) => {
  try {
    let subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }

    // Make sure user owns subscription
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    subscription.lastPaidDate = Date.now();
    await subscription.save();

    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;