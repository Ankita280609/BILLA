const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authmid');
const sendEmail = require('../services/emailService');


router.use(protect);

router.post('/test', async (req, res) => {
  try {
    const user = req.user;

    const subject = 'This is a test email from BILLA!';
    const text = `Hello ${user.name}, this is a test notification.`;
    const html = `<b>Hello ${user.name},</b><p>This is a test notification.</p>`;

    await sendEmail({
      to: user.email,
      subject: subject,
      text: text,
      html: html,
    });

    res.status(200).json({ msg: 'Test email sent successfully.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/notify/query
// @desc    Send a query to admin
// @access  Private
router.post('/query', async (req, res) => {
  try {
    const user = req.user;
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ msg: 'Query text is required' });
    }

    const subject = `New Query from ${user.name}`;
    const text = `User: ${user.name} (${user.email})\n\nQuery:\n${query}`;
    const html = `
      <h3>New Query Received</h3>
      <p><strong>User:</strong> ${user.name} (${user.email})</p>
      <p><strong>Query:</strong></p>
      <p>${query}</p>
    `;

    await sendEmail({
      to: 'thakurankita773@gmail.com',
      subject: subject,
      text: text,
      html: html,
    });

    res.status(200).json({ msg: 'Query sent successfully.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;