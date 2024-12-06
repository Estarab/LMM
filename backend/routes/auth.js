



// backend/routes/auth.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { name, surname, phone } = req.body;

  try {
    // Check if phone number already exists in the database
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: ' already registered!' });
    }

    // Create new user
    const newUser = new User({ name, surname, phone });
    await newUser.save();

    res.status(201).json({ message: 'User successfully signed up!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ' error' });
  }
});

// Check if a user is signed up
// Check if a user is signed up
router.get('/check', async (req, res) => {
  const { phone } = req.query;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      // Inform the user that they need to sign up first
      return res.status(404).json({ message: 'Phone number not registered. Please sign up first.' });
    }

    // If the user is found, return a success message
    res.status(200).json({ message: 'User is signed up!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking phone number. Please try again later.' });
  }
});

export default router;
