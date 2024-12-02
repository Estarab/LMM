import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  pickedParticipantId: { 
    type: Number, 
    required: true, 
    unique: true  // This ensures uniqueness on the pickedParticipantId field
  },
}, {
  timestamps: true,
});

// Create the index if it doesn't exist
participantSchema.index({ pickedParticipantId: 1 }, { unique: true }); // Ensures unique pickedParticipantId

const Participant = mongoose.model('Participant', participantSchema);

export default Participant;







// // models/Participant.js
// const mongoose = require('mongoose');

// const participantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   surname: { type: String, required: true },
//   phone: { type: String, required: true },
//   pickedParticipantId: { 
//     type: Number, 
//     required: true, 
//     unique: true // Ensures pickedParticipantId is unique
//   },
// });

// const Participant = mongoose.model('Participant', participantSchema);

// module.exports = Participant;



// const mongoose = require('mongoose');

// const ParticipantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   surname: { type: String, required: true },
//   phone: { type: String, required: true, unique: true }, // Ensure phone numbers are unique
//   pickedParticipantId: { type: Number, required: true }, // ID of the participant that this user is buying for
// });

// // Create a compound index for phone and surname to ensure unique pairs
// ParticipantSchema.index({ phone: 1, surname: 1 }, { unique: true });

// module.exports = mongoose.model('Participant', ParticipantSchema);
