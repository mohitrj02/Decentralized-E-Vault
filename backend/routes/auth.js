const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Rate Limiting Middleware
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

router.use('/login', loginLimiter); // Apply rate limiting only to the login route

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
      sameSite: 'Strict', // Helps prevent CSRF attacks
      maxAge: 3600000 // 1 hour
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
