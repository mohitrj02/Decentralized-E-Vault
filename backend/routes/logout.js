// routes/logout.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
