const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');

// Register
router.post(
  '/signup',
  [
    // Validate input fields
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('username').not().isEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, username, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists' });

      // Create new user
      user = new User({
        name,
        email,
        username,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to database
      await user.save();

      // Return JWT token and set as a cookie
      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set token in cookie
      res.cookie('authToken', token, {
        httpOnly: true, // Helps prevent XSS attacks
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are sent over HTTPS in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 3600000 // 1 hour
      });

      res.json({ msg: 'User registered and logged in' });
    } catch (err) {
      console.error('Error during signup:', err);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
);

module.exports = router;
