// src/components/PickedParticipants.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Predefined participants data (you can replace this with an API call)
const participantsData = [
  { name: 'Sister Esther Abrahams ', phone: '1111' },
  { name: 'Brother Abraham Israel ', phone: '0000' },
//   { name: 'Sister Abigail Luwawa - Group Church', phone: '0974334550' },
  // Add more participants here...
];

const PickedParticipants = () => {
  const [pickedParticipants, setPickedParticipants] = useState([]);
  const [participantInput, setParticipantInput] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const navigate = useNavigate();

  // Load picked participants from localStorage when the component mounts
  useEffect(() => {
    const storedPickedParticipants = JSON.parse(localStorage.getItem('clickedParticipants')) || [];
    setPickedParticipants(storedPickedParticipants);
  }, []);

  // Handle adding a participant to the picked list
  const handleAddParticipant = () => {
    if (!isPhoneValid) {
      setPhoneError('Please enter a valid password!');
      return;
    }

    if (participantInput.trim() !== '' && !pickedParticipants.includes(participantInput)) {
      const newPickedList = [...pickedParticipants, participantInput];
      setPickedParticipants(newPickedList);
      localStorage.setItem('clickedParticipants', JSON.stringify(newPickedList)); // Update localStorage
      setParticipantInput(''); // Clear input field
    } else {
      alert('Please enter a valid and non-duplicate participant number');
    }
  };

  // Handle phone validation
  const handlePhoneSubmit = () => {
    const isValid = participantsData.some(participant => participant.phone === phone);
    if (isValid) {
      setIsPhoneValid(true);
      setPhoneError('');
      setIsVerifyingPhone(false); // Allow user to add participant after verification
    } else {
      setPhoneError('Password not found!');
      setIsPhoneValid(false);
    }
  };

  // Handle phone number verification click
  const handlePhoneVerificationClick = () => {
    setIsVerifyingPhone(true); // Show phone number input after the user clicks to add a participant
  };

  // Handle removing a participant from the picked list
  const handleRemoveParticipant = (participant) => {
    const updatedList = pickedParticipants.filter((p) => p !== participant);
    setPickedParticipants(updatedList);
    localStorage.setItem('clickedParticipants', JSON.stringify(updatedList)); // Update localStorage
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-24 max-w-screen-lg mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-4">Already Picked Participants</h3>
      <p className="text-lg text-center mb-4">All participant-Numbers that have already been picked are listed in this section.</p>
      <p className="text-lg text-center mb-4">Please check the picked participants here and only select the ones that are not on this list!</p>

      {/* Display button to start the phone verification process */}
      {!isVerifyingPhone ? (
        <div className="mb-4 flex justify-center">
          <button
            onClick={handlePhoneVerificationClick}
            className="bg-blue-600 text-white p-3 rounded-md w-full sm:w-auto"
          >
            Click here to add a participant who has already been picked. (only for admins)
          </button>
        </div>
      ) : (
        <div className="mb-4 flex justify-center flex-wrap">
          {/* Phone number prompt */}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="password"
            className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3 md:w-1/4 lg:w-1/5 mr-2"
          />
          <button
            onClick={handlePhoneSubmit}
            className="bg-blue-600 text-white p-2 rounded-md w-full sm:w-auto"
          >
            Verify Password
          </button>
        </div>
      )}

      {/* Error message for invalid phone number */}
      {phoneError && <p className="text-red-500 text-center">{phoneError}</p>}

      {/* If phone is valid, show the Add Participant button */}
      {isPhoneValid && (
        <div className="mb-4 flex justify-center flex-wrap">
          <input
            type="text"
            value={participantInput}
            onChange={(e) => setParticipantInput(e.target.value)}
            placeholder="Enter Participant Number"
            className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3 md:w-1/4 lg:w-1/5 mr-2"
          />
          <button
            onClick={handleAddParticipant}
            className="bg-green-600 text-white p-2 rounded-md w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      )}

      {/* Display the picked participants */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pickedParticipants.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full"></p>
        ) : (
          pickedParticipants.map((participant, index) => (
            <div
              key={index}
              className="bg-red-400 text-white p-4 text-center rounded-md"
            >
              Participant {participant}
              {/* <button
                onClick={() => handleRemoveParticipant(participant)}
                className="text-red-500 ml-2 text-sm"
              >
                Remove
              </button> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PickedParticipants;



// // src/components/PickedParticipants.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Predefined participants data (you can replace this with an API call)
// const participantsData = [
//   { name: 'Sister Joyce Chifitah - Group Church', phone: '111' },
//   { name: 'Brother Perry Mwape - Uptown Church', phone: '0971198536' },
//   { name: 'Sister Abigail Luwawa - Group Church', phone: '0974334550' },
//   // Add more participants here...
// ];

// const PickedParticipants = () => {
//   const [pickedParticipants, setPickedParticipants] = useState([]);
//   const [participantInput, setParticipantInput] = useState('');
//   const [phone, setPhone] = useState('');
//   const [phoneError, setPhoneError] = useState('');
//   const [isPhoneValid, setIsPhoneValid] = useState(false);
//   const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
//   const navigate = useNavigate();

//   // Load picked participants from localStorage when the component mounts
//   useEffect(() => {
//     const storedPickedParticipants = JSON.parse(localStorage.getItem('clickedParticipants')) || [];
//     setPickedParticipants(storedPickedParticipants);
//   }, []);

//   // Handle adding a participant to the picked list
//   const handleAddParticipant = () => {
//     if (!isPhoneValid) {
//       setPhoneError('Please enter a valid password!');
//       return;
//     }

//     if (participantInput.trim() !== '' && !pickedParticipants.includes(participantInput)) {
//       const newPickedList = [...pickedParticipants, participantInput];
//       setPickedParticipants(newPickedList);
//       localStorage.setItem('clickedParticipants', JSON.stringify(newPickedList)); // Update localStorage
//       setParticipantInput(''); // Clear input field
//     } else {
//       alert('Please enter a valid and non-duplicate participant number');
//     }
//   };

//   // Handle phone validation
//   const handlePhoneSubmit = () => {
//     const isValid = participantsData.some(participant => participant.phone === phone);
//     if (isValid) {
//       setIsPhoneValid(true);
//       setPhoneError('');
//       setIsVerifyingPhone(false); // Allow user to add participant after verification
//     } else {
//       setPhoneError('Password not found!');
//       setIsPhoneValid(false);
//     }
//   };

//   // Handle phone number verification click
//   const handlePhoneVerificationClick = () => {
//     setIsVerifyingPhone(true); // Show phone number input after the user clicks to add a participant
//   };

//   // Handle removing a participant from the picked list
//   const handleRemoveParticipant = (participant) => {
//     const updatedList = pickedParticipants.filter((p) => p !== participant);
//     setPickedParticipants(updatedList);
//     localStorage.setItem('clickedParticipants', JSON.stringify(updatedList)); // Update localStorage
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//       <h3 className="text-2xl font-semibold text-center mb-4">Picked Participants</h3>
//       <p className="text-2xl text-center mb-4">All Participants that have already been Picked are showing in this section</p>
//       <p className="text-2xl text-center mb-4">Check the Already Picked Participants here and only pick the ones not on this list</p>

//       {/* Display button to start the phone verification process */}
//       {!isVerifyingPhone ? (
//         <div className="mb-4 flex justify-center">
//           <button
//             onClick={handlePhoneVerificationClick}
//             className="bg-blue-600 text-white p-2 rounded-md"
//           >
//             Click here to add a participant who has already been picked , only for admins
//           </button>
//         </div>
//       ) : (
//         <div className="mb-4 flex justify-center">
//           {/* Phone number prompt */}
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="password"
//             className="border border-gray-300 p-2 rounded-md w-1/3 mr-2"
//           />
//           <button
//             onClick={handlePhoneSubmit}
//             className="bg-blue-600 text-white p-2 rounded-md"
//           >
//             Verify Password
//           </button>
//         </div>
//       )}

//       {/* Error message for invalid phone number */}
//       {phoneError && <p className="text-red-500 text-center">{phoneError}</p>}

//       {/* If phone is valid, show the Add Participant button */}
//       {isPhoneValid && (
//         <>
//           <div className="mb-4 flex justify-center">
//             <input
//               type="text"
//               value={participantInput}
//               onChange={(e) => setParticipantInput(e.target.value)}
//               placeholder="Enter Participant Number"
//               className="border border-gray-300 p-2 rounded-md w-1/3 mr-2"
//             />
//             <button
//               onClick={handleAddParticipant}
//               className="bg-green-600 text-white p-2 rounded-md"
//             >
//               Add
//             </button>
//           </div>
//         </>
//       )}

//       {/* Display the picked participants */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {pickedParticipants.length === 0 ? (
//           <p className="text-gray-500 text-center col-span-full">No participants picked yet.</p>
//         ) : (
//           pickedParticipants.map((participant, index) => (
//             <div
//               key={index}
//               className="bg-red-600 text-white p-4 text-center rounded-md"
//             >
//               Participant {participant}
//               <button
//                 onClick={() => handleRemoveParticipant(participant)}
//                 className="text-red-500 ml-2 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default PickedParticipants;






// import React, { useState, useEffect } from 'react';

// const ParticipantsPicked = () => {
//   const [pickedParticipants, setPickedParticipants] = useState([]);
//   const [participantInput, setParticipantInput] = useState('');

//   // Load picked participants from localStorage when the component mounts
//   useEffect(() => {
//     const storedPickedParticipants = JSON.parse(localStorage.getItem('clickedParticipants')) || [];
//     setPickedParticipants(storedPickedParticipants);
//   }, []);

//   // Handle adding a participant to the picked list
//   const handleAddParticipant = () => {
//     if (participantInput.trim() !== '' && !pickedParticipants.includes(participantInput)) {
//       const newPickedList = [...pickedParticipants, participantInput];
//       setPickedParticipants(newPickedList);
//       localStorage.setItem('clickedParticipants', JSON.stringify(newPickedList)); // Update localStorage
//       setParticipantInput(''); // Clear input field
//     } else {
//       alert('Please enter a valid and non-duplicate participant number');
//     }
//   };

//   // Handle removing a participant from the picked list
//   const handleRemoveParticipant = (participant) => {
//     const updatedList = pickedParticipants.filter((p) => p !== participant);
//     setPickedParticipants(updatedList);
//     localStorage.setItem('clickedParticipants', JSON.stringify(updatedList)); // Update localStorage
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//       <h3 className="text-2xl font-semibold text-center mb-4">Participants that have Already been Picked</h3>
//       <p className="text-lg font-semibold text-center mb-4">Enter Participant Number that you have already picked to add them to the list of already picked Participants</p>

//       {/* Input field to manually add a participant */}
//       <div className="mb-4 flex justify-center">
//         <input
//           type="text"
//           value={participantInput}
//           onChange={(e) => setParticipantInput(e.target.value)}
//           placeholder="Enter Participant Number"
//           className="border border-gray-300 p-2 rounded-md w-1/3 mr-2"
//         />
//         <button
//           onClick={handleAddParticipant}
//           className="bg-green-600 text-white p-2 rounded-md"
//         >
//           Add
//         </button>
//       </div>

//       {/* Display the picked participants */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {pickedParticipants.length === 0 ? (
//           <p className="text-gray-500 text-center col-span-full">No participants picked yet.</p>
//         ) : (
//           pickedParticipants.map((participant, index) => (
//             <div
//               key={index}
//               className="bg-red-400 text-white p-4 text-center rounded-md"
//             >
//               Participant {participant}
//               <button
//                 onClick={() => handleRemoveParticipant(participant)}
//                 className="text-white-500 ml-2 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ParticipantsPicked;
