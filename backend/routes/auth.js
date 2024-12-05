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
router.get('/check', async (req, res) => {
  const { phone } = req.query;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: 'You need to sign up first!' });
    }

    res.status(200).json({ message: 'User is signed up!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ' error' });
  }
});

export default router;
