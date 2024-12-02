// backend/models/Picker.js
import mongoose from 'mongoose';

const pickerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  pickedParticipantId: { type: Number, unique: true },  // Ensures a participant is picked only once
}, { timestamps: true });

const Picker = mongoose.model('Picker', pickerSchema);

export default Picker;



// // backend/models/Picker.js

// import mongoose from 'mongoose';

// const pickerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   surname: { type: String, required: true },
//   phone: { type: String, required: true, unique: true }, // Unique phone number to prevent duplicates
//   pickedParticipantId: { type: Number, unique: true },  // Ensures a participant is picked only once
// }, { timestamps: true });

// const Picker = mongoose.model('Picker', pickerSchema);

// export default Picker;
