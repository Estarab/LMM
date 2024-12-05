
import express from 'express';             // Using ES import
import path from 'path';
import { fileURLToPath } from 'url'; 
import cors from 'cors';                  // Using ES import
import dotenv from 'dotenv';              // Using ES import
import mongoose from 'mongoose';          // Using ES import
import Participant from './models/Participant.js'; // Using ES import with file extension
import User from './models/User.js';  
import authRoute from './routes/auth.js';      // Assuming we create a User model for sign-up/login

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.use(express.static(path.join(__dirname, 'build')));

// For any other route, serve index.html (important for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Set up CORS to allow requests from the frontend URL (for deployment)
const allowedOrigins = [
  'http://localhost:3000', // Localhost (for development)
  'https://lmm-4wbi.onrender.com', // Frontend URL for production
  // You can add more frontend URLs if you have multiple environments
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // If the origin is allowed, proceed with the request
    } else {
      callback(new Error('Not allowed by CORS')); // If the origin is not allowed
    }
  },
  credentials: true, // Allow cookies and credentials
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI from .env

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes for participants
app.use('/api/auth', authRoute); // Use the auth route for signup and check

// Route for user sign-up
app.post('/api/signup', async (req, res) => {
  const { name, phone } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this phone number!' });
    }

    // Create a new user
    const newUser = new User({
      name,
      phone
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User successfully signed up!' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Error signing up user' });
  }
});

// Route for user login
app.post('/api/login', async (req, res) => {
  const { phone } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ phone });
    if (!existingUser) {
      return res.status(400).json({ message: 'No user found with this phone number!' });
    }

    // User found, proceed to login
    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
});

// Submit a participant's data (check if phone number is already used)
app.post('/api/submit-participant', async (req, res) => {
  const { phone, name, surname, pickedParticipantId } = req.body;

  try {
    // Check if the combination of phone and surname already exists in the database
    const existingParticipant = await Participant.findOne({ phone, surname });

    if (existingParticipant) {
      return res.status(400).json({ message: 'You have already picked someone!' });
    }

    // Create a new participant
    const newParticipant = new Participant({
      name,
      surname,
      phone,
      pickedParticipantId,
    });

    // Save the new participant
    await newParticipant.save();

    // Respond with success
    res.status(201).json({ message: 'Participant successfully registered!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ' error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




