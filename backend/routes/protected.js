const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Import your middleware

// Protected route
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data' });
});

module.exports = router;
