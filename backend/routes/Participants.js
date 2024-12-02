import express from 'express';
import Participant from '../models/Participant.js';
import Picker from '../models/Picker.js';

const router = express.Router();

// Endpoint to submit the picked participant details
router.post('/submit-participant', async (req, res) => {
  const { name, surname, phone, pickedParticipantId } = req.body;

  try {
    // Check if the pickedParticipantId already exists in either the Participant or Picker collection
    const existingParticipant = await Participant.findOne({ pickedParticipantId });

    if (existingParticipant) {
      return res.status(400).json({ message: 'This participant ID has already been picked!' });
    }

    // Create a new participant if no duplicates are found
    const newParticipant = new Participant({
      name,
      surname,
      phone,
      pickedParticipantId,
    });

    await newParticipant.save();
    return res.status(201).json({ message: 'Participant successfully picked!' });

  } catch (error) {
    if (error.code === 11000) {  // MongoDB error code for duplicate key
      return res.status(400).json({ message: 'This pickedParticipantId is already taken.' });
    }
    console.error('Error saving participant:', error);
    return res.status(500).json({ message: 'An error occurred while submitting your details.' });
  }
});


export default router;






// // backend/routes/participants.js
// const express = require('express');
// const router = express.Router();
// const Participant = require('../models/Participant');

// // Endpoint to submit the picked participant details
// router.post('/submit-participant', async (req, res) => {
//   const { name, surname, phone, pickedParticipantId } = req.body;

//   // Check if the picked participant has already been chosen
//   try {
//     const existingParticipant = await Participant.findOne({ pickedParticipantId });

//     if (existingParticipant) {
//       // If the picked participant ID already exists in the database, send an error
//       return res.status(400).json({ message: 'This participant has already been picked!' });
//     }

//     // If the picked participant ID is available, proceed to save the new participant
//     const newParticipant = new Participant({
//       name,
//       surname,
//       phone,
//       pickedParticipantId,
//     });

//     await newParticipant.save();
//     return res.status(201).json({ message: 'Participant successfully picked!' });

//   } catch (error) {
//     console.error('Error saving participant:', error);
//     return res.status(500).json({ message: 'An error occurred while submitting your details.' });
//   }
// });

// module.exports = router;



// // backend/routes/participants.js
// const express = require('express');
// const Participant = require('../models/Participant');
// const router = express.Router();

// // GET all participants
// router.get('/', async (req, res) => {
//   try {
//     const participants = await Participant.find();
//     res.json(participants);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // POST a new participant
// router.post('/', async (req, res) => {
//   const { name, phone, photo } = req.body;
//   try {
//     const newParticipant = new Participant({ name, phone, photo });
//     await newParticipant.save();
//     res.status(201).json(newParticipant);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// module.exports = router;
