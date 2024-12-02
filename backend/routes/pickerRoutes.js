// backend/routes/pickerRoutes.js
import express from 'express';
import Picker from '../models/Picker.js';
import Participant from '../models/Participant.js';  // Add Participant model import

const router = express.Router();

// Route to save picker data
router.post('/pick', async (req, res) => {
  const { name, surname, phone, pickedParticipantId } = req.body;

  try {
    // Check if the pickedParticipantId already exists in either the Participant or Picker collection
    const existingParticipant = await Participant.findOne({ pickedParticipantId });
    const existingPicker = await Picker.findOne({ pickedParticipantId });

    if (existingParticipant || existingPicker) {
      return res.status(400).json({ message: 'This participant ID has already been picked by someone!' });
    }

    // Check if the phone number is already used
    const phoneExists = await Picker.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ message: 'This phone number has already been used.' });
    }

    // Create new picker
    const newPicker = new Picker({ name, surname, phone, pickedParticipantId });
    await newPicker.save();

    return res.status(201).json({ message: 'Picker details saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;




// // backend/routes/pickerRoutes.js

// import express from 'express';
// import Picker from '../models/Picker.js';

// const router = express.Router();

// // Route to save picker data
// router.post('/pick', async (req, res) => {
//   const { name, surname, phone, pickedParticipantId } = req.body;

//   try {
//     // Check if the participant is already picked
//     const participantExists = await Picker.findOne({ pickedParticipantId });
//     if (participantExists) {
//       return res.status(400).json({ message: 'This participant has already been picked.' });
//     }

//     // Check if the phone number is already used
//     const phoneExists = await Picker.findOne({ phone });
//     if (phoneExists) {
//       return res.status(400).json({ message: 'This phone number has already been used.' });
//     }

//     // Create new picker
//     const newPicker = new Picker({ name, surname, phone, pickedParticipantId });
//     await newPicker.save();

//     return res.status(201).json({ message: 'Picker details saved successfully.' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Route to get all pickers (to track who picked what)
// router.get('/pickers', async (req, res) => {
//   try {
//     const pickers = await Picker.find();
//     return res.status(200).json(pickers);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// export default router;
