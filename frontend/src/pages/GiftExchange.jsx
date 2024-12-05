// src/pages/GiftExchange.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeComp from '../components/HomeComp';
import GiftExchangeInstructions from '../components/GiftExchangeInstructions';
import FooterSection from '../components/Footer';
import ParticipantsPicked from '../components/ParticipantsPicked';

// Static data for participants (only name, phone, and photo)
const participantsData = [
  { name: 'Sister Joyce Chifitah - Group Church', phone: '0978540835', photo: '' },
  { name: 'Brother Perry Mwape - Uptown Church', phone: '0971198536', photo: '' },
  { name: 'Sister Abigail Luwawa - Group Church', phone: '0974334550', photo: '' },
  { name: 'Sister Zoe Chirwa - Group Church', phone: '0975999207', photo: '' },
  { name: 'Sister Sankhuleni Phiri - Group Church', phone: '0979383408', photo: '' },
  { name: 'Sister Bertha Mukubesa - Group Church', phone: '0977949107', photo: '' },
  { name: 'Sister Petronella Mula - Group Church ', phone: '0779896675', photo: '' },
  { name: 'Brother Abraham Israel Nasilele', phone: '0977219990', photo: '' },
  { name: 'Sister Taonga Ngoma - Mass Media', phone: '0972768632', photo: '' },
  { name: 'Sister Lucia Mwanza - Palm Drive', phone: '0976532220', photo: '' },
  { name: 'Sister Margaret Edith Zulu - Uptown', phone: '0973164446', photo: '' },
  { name: 'Sister Felistus Tandeo - Group Church', phone: '0977463439', photo: '' },
  { name: 'Sister Esther Abrahams - Group Church', phone: '0979110853', photo: '' },
  { name: 'Sister Ruth Mweemba - Group Church', phone: '0975043668', photo: '' },
  { name: 'Sister Natasha Chewe - Group Church', phone: '0975616823', photo: '' },
  { name: 'Sister Possible Mighty - Palm Drive', phone: '0971799653', photo: '' },
  { name: 'Sister Catherine Chavinda From Group Church', phone: '0779205119', photo: '' },
  { name: 'Sister Rosemary Khondowe - Group Church', phone: '0764986712', photo: '' },
  { name: 'Brother James Chola - Group Church - Drummer', phone: '0976992870', photo: '' },
  { name: 'Sister Jacqueline Phiri from Group Church ', phone: '0978144144', photo: '' },
  { name: 'Brother Solomon Phiri - Group Church - Band', phone: '0976128175', photo: '' },
  { name: 'Sister Felly Light (Felistus) from Palm Drive', phone: '0976356325', photo: '' },
  { name: 'Sister Memory Nayame - Uptown', phone: '0979908797', photo: '' },
  { name: 'Sister Mary malola T Banda - Uptown', phone: '0775767458', photo: '' },
  { name: 'Sister Taonga Zulu - Group Church', phone: '0971001525', photo: '' },
  { name: 'Brother Micheal Bukasa - Group Church - Technical', phone: '0770346596', photo: '' },
  { name: 'Sister Louise Lufalanga -Group Church', phone: '09771279422', photo: '' },
  { name: 'Sister King Gwen Munkombwe from Group Church', phone: '0977851511', photo: '' }
];

const GiftExchange = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', surname: '', phone: '' });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [clickedParticipants, setClickedParticipants] = useState(new Set());
  const [submittedPhones, setSubmittedPhones] = useState(new Set());
  const [submittedSurnames, setSubmittedSurnames] = useState(new Set());
  const [disabledButtons, setDisabledButtons] = useState(new Set());
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  // Load submission state from localStorage
  useEffect(() => {
    const storedSubmittedPhones = JSON.parse(localStorage.getItem('submittedPhones')) || [];
    const storedSubmittedSurnames = JSON.parse(localStorage.getItem('submittedSurnames')) || [];
    const storedClickedParticipants = JSON.parse(localStorage.getItem('clickedParticipants')) || [];

    setSubmittedPhones(new Set(storedSubmittedPhones));
    setSubmittedSurnames(new Set(storedSubmittedSurnames));
    setClickedParticipants(new Set(storedClickedParticipants));
  }, []);

  const handleButtonClick = (number) => {
    if (hasSubmitted) {
      alert('You have already submitted your details!');
      return;
    }

    if (submittedPhones.has(userDetails.phone) && submittedSurnames.has(userDetails.surname))  {
      alert('Has already been used!');
      return;
    }

    if (clickedParticipants.has(number)) {
      alert('This participant has already been picked!');
      return;
    }

    setSelectedNumber(number);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.phone) {
      setPhoneError('Password  is required.');
      return;
    }

    // Check if phone number is unique
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/check`, {
        params: { phone: userDetails.phone }
      });

      if (response.data.message === 'Not a participant!') {
        setPhoneError('The password you entered is not registered as a participant. Please sign up!');
        return;
      }

      const selectedParticipant = participantsData[selectedNumber - 1];

      try {
        // Submit the form data to the backend
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/submit-participant`, {
          name: userDetails.name,
          surname: userDetails.surname,
          phone: userDetails.phone,
          pickedParticipantId: selectedNumber,
        });

        // If successful, navigate to the assigned participant page
        navigate('/assigned-participant', {
          state: { selectedParticipant, userDetails }
        });

        // Mark the participant as picked and hide the corresponding button
        setHasSubmitted(true);
        setClickedParticipants((prev) => new Set(prev.add(selectedNumber)));
        setSubmittedPhones((prev) => new Set(prev.add(userDetails.phone)));
        setSubmittedSurnames((prev) => new Set(prev.add(userDetails.surname)));
        setModalOpen(false);

        // Update localStorage to persist the state across page refreshes
        localStorage.setItem('clickedParticipants', JSON.stringify([...clickedParticipants]));
        localStorage.setItem('submittedPhones', JSON.stringify([...submittedPhones]));
        localStorage.setItem('submittedSurnames', JSON.stringify([...submittedSurnames]));

        // Disable the button after submission
        setDisabledButtons((prev) => new Set(prev.add(selectedNumber)));
      } catch (error) {
        if (error.response && error.response.data.message) {
          if (error.response.data.message === 'Server error') {
            setPhoneError('This Participant has already been Picked. Please try another Number.');
          } else {
            setPhoneError(error.response.data.message); // Show backend error message
          }
        } else {
          setPhoneError('An unknown error occurred. Please try again later.');
        }
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setPhoneError(err.response.data.message); // Show specific error for phone validation
      } else {
        setPhoneError('An error occurred while checking your details. Please try again.');
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-green-100 min-h-screen p-8">
      <div>
        <HomeComp />
        <GiftExchangeInstructions />
        
      </div>
      {/* <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Click On A Number</h2> */}
      <ParticipantsPicked/>
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Click On A Number</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 text-lg font-bold">
        {[...Array(28).keys()].map((i) => (
          !clickedParticipants.has(i + 1) ? (
            <button
              key={i + 1}
              onClick={() => handleButtonClick(i + 1)}
              className={`w-full p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 ${disabledButtons.has(i + 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={disabledButtons.has(i + 1)}
            >
              Participant {i + 1}
            </button>
          ) : (
            <button
              key={i + 1}
              className="w-full p-3 rounded-lg bg-gray-300 text-white opacity-50 cursor-not-allowed"
              disabled
            >
              {participantsData[i].name}
            </button>
          )
        ))}
      </div>

      {/* Modal for submitting participant details */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full sm:w-96">
            <h3 className="text-2xl font-semibold mb-4 text-center">Enter your details</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block font-medium" htmlFor="name">First Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your First Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userDetails.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium" htmlFor="surname">Last Name</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Enter Your Last Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userDetails.surname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium" htmlFor="phone">Password</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter Your PassWord"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                />
              </div>
              {phoneError && (
                <div className="text-red-600 text-sm mb-4">{phoneError}</div>
              )}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
};

export default GiftExchange;






// // src/pages/GiftExchange.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import HomeComp from '../components/HomeComp';
// import GiftExchangeInstructions from '../components/GiftExchangeInstructions';
// import FooterSection from '../components/Footer';

// // Static data for participants (only name, phone, and photo)
// const participantsData = [
//   { name: 'Sister Joyce Chifitah - Group Church', phone: '0978540835', photo: '' },
//   { name: 'Brother Perry Mwape - Uptown Church', phone: '0971198536', photo: '' },
//   { name: 'Sister Abigail Luwawa - Group Church', phone: '0974334550', photo: '' },
//   { name: 'Sister Zoe Chirwa - Group Church', phone: '0975999207', photo: '' },
//   { name: 'Sister Sankhuleni Phiri - Group Church', phone: '0979383408', photo: '' },
//   { name: 'Sister Bertha Mukubesa - Group Church', phone: '0977949107', photo: '' },
//   { name: 'Sister Petronella Mula - Group Church ', phone: '0779896675', photo: '' },
//   { name: 'Brother Abraham Israel Nasilele', phone: '0977219990', photo: '' },
//   { name: 'Sister Taonga Ngoma - Mass Media', phone: '0972768632', photo: '' },
//   { name: 'Sister Lucia Mwanza - Palm Drive', phone: '0976532220', photo: '' },
//   { name: 'Sister Margaret Edith Zulu - Uptown', phone: '0973164446', photo: '' },
//   { name: 'Sister Felistus Tandeo - Group Church', phone: '0977463439', photo: '' },
//   { name: 'Sister Esther Abrahams - Group Church', phone: '0979110853', photo: '' },
//   { name: 'Sister Ruth Mweemba - Group Church', phone: '0975043668', photo: '' },
//   { name: 'Sister Natasha Chewe - Group Church', phone: '0975616823', photo: '' },
//   { name: 'Sister Possible Mighty - Palm Drive', phone: '0971799653', photo: '' },
//   { name: 'Sister Catherine Chavinda From Group Church', phone: '0779205119', photo: '' },
//   { name: 'Sister Rosemary Khondowe - Group Church', phone: '0764986712', photo: '' },
//   { name: 'Brother James Chola - Group Church - Drummer', phone: '0976992870', photo: '' },
//   { name: 'Sister Jacqueline Phiri from Group Church ', phone: '0978144144', photo: '' },
//   { name: 'Brother Solomon Phiri - Group Church - Band', phone: '0976128175', photo: '' },
//   { name: 'Sister Felly Light (Felistus) from Palm Drive', phone: '0976356325', photo: '' },
//   { name: 'Sister Memory Nayame - Uptown', phone: '0979908797', photo: '' },
//   { name: 'Sister Mary malola T Banda - Uptown', phone: '0775767458', photo: '' },
//   { name: 'Sister Taonga Zulu - Group Church', phone: '0971001525', photo: '' },
//   { name: 'Brother Micheal Bukasa - Group Church - Technical', phone: '0770346596', photo: '' },
//   { name: 'Sister Louise Lufalanga -Group Church', phone: '09771279422', photo: '' },
//   { name: 'Sister King Gwen Munkombwe from Group Church', phone: '0977851511', photo: '' }
// ];

// const GiftExchange = () => {
//   const [selectedNumber, setSelectedNumber] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [userDetails, setUserDetails] = useState({ name: '', surname: '', phone: '' });
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [clickedParticipants, setClickedParticipants] = useState(new Set());
//   const [submittedPhones, setSubmittedPhones] = useState(new Set());
//   const [submittedSurnames, setSubmittedSurnames] = useState(new Set());
//   const [disabledButtons, setDisabledButtons] = useState(new Set());
//   const [phoneError, setPhoneError] = useState('');
//   const navigate = useNavigate();

//   // Load submission state from localStorage
//   useEffect(() => {
//     const storedSubmittedPhones = JSON.parse(localStorage.getItem('submittedPhones')) || [];
//     const storedSubmittedSurnames = JSON.parse(localStorage.getItem('submittedSurnames')) || [];
//     const storedClickedParticipants = JSON.parse(localStorage.getItem('clickedParticipants')) || [];

//     setSubmittedPhones(new Set(storedSubmittedPhones));
//     setSubmittedSurnames(new Set(storedSubmittedSurnames));
//     setClickedParticipants(new Set(storedClickedParticipants));
//   }, []);

//   const handleButtonClick = (number) => {
//     if (hasSubmitted) {
//       alert('You have already submitted your details!');
//       return;
//     }

//     if (submittedPhones.has(userDetails.phone) && submittedSurnames.has(userDetails.surname))  {
//       alert('Has already been used!');
//       return;
//     }

//     if (clickedParticipants.has(number)) {
//       alert('This participant has already been picked!');
//       return;
//     }

//     setSelectedNumber(number);
//     setModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (!userDetails.phone) {
//       setPhoneError('this field is required.');
//       return;
//     }

//     // Check if phone number is unique
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/check`, {
//         params: { phone: userDetails.phone }
//       });

//       if (response.data.message === ' Not a participant!') {
//         setPhoneError('Not a participant!');
//         return;
//       }

//       const selectedParticipant = participantsData[selectedNumber - 1];

//       try {
//         // Submit the form data to the backend
//         const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/submit-participant`, {
//           name: userDetails.name,
//           surname: userDetails.surname,
//           phone: userDetails.phone,
//           pickedParticipantId: selectedNumber,
//         });

//         // If successful, navigate to the assigned participant page
//         navigate('/assigned-participant', {
//           state: { selectedParticipant, userDetails }
//         });

//         // Mark the participant as picked and hide the corresponding button
//         setHasSubmitted(true);
//         setClickedParticipants((prev) => new Set(prev.add(selectedNumber)));
//         setSubmittedPhones((prev) => new Set(prev.add(userDetails.phone)));
//         setSubmittedSurnames((prev) => new Set(prev.add(userDetails.surname)));
//         setModalOpen(false);

//         // Update localStorage to persist the state across page refreshes
//         localStorage.setItem('clickedParticipants', JSON.stringify([...clickedParticipants]));
//         localStorage.setItem('submittedPhones', JSON.stringify([...submittedPhones]));
//         localStorage.setItem('submittedSurnames', JSON.stringify([...submittedSurnames]));

//         // Disable the button after submission
//         setDisabledButtons((prev) => new Set(prev.add(selectedNumber)));
//       } catch (error) {
//         // if (error.response && error.response.data.message) {
//         if (error.response && error.response.data.message) {
//           alert(error.response.data.message); // Show error from backend if exists
//           // alert("The Number you picked has already been picked, please try another Number"); // Show error from backend if exists
//         } else {
//           alert('Error submitting participant details');
//         }
//       }

  

//     } catch (err) {
//       setPhoneError('Password not recognised, enter your correct password or sign up to participate! ');
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div className="bg-green-100 min-h-screen p-8">
//       <div>
//         <HomeComp />
//         <GiftExchangeInstructions />
//       </div>
//       <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Click On A Number</h2>

//       {/* <div className="grid grid-cols-4 gap-4 mb-6 text-xl font-bold">
//         {[...Array(25).keys()].map((i) => (
//           !clickedParticipants.has(i + 1) ? (
//             <button
//               key={i + 1}
//               onClick={() => handleButtonClick(i + 1)}
//               className={`w-32 p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white ${disabledButtons.has(i + 1) ? 'cursor-not-allowed opacity-50' : ''}`}
//             >
//               {i + 1}
//             </button>
//           ) : (
//             <button
//               key={i + 1}
//               disabled
//               className="w-32 p-3 rounded-lg bg-gray-500 text-white"
//             >
//               {i + 1}
//             </button>
//           )
//         ))}
//       </div> */}

// <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 text-xl font-bold">
//   {[...Array(28).keys()].map((i) => (
//     !clickedParticipants.has(i + 1) ? (
//       <button
//         key={i + 1}
//         onClick={() => handleButtonClick(i + 1)}
//         className={`w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white ${disabledButtons.has(i + 1) ? 'cursor-not-allowed opacity-50' : ''}`}
//       >
//         {i + 1}
//       </button>
//     ) : (
//       <button
//         key={i + 1}
//         disabled
//         className="w-full p-3 rounded-lg bg-white border-2 border-red-500 text-red-500"
//       >
//         {i + 1}
//       </button>
//     )
//   ))}
// </div>


//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
//             <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-2xl">&times;</button>
//             <h3 className="text-xl font-semibold text-green-600 mb-4">Enter Your Details</h3>
//             <form onSubmit={handleFormSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your First Name"
//                 value={userDetails.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 mb-4 border rounded-lg"
//                 required
//               />
//               <input
//                 type="text"
//                 name="surname"
//                 placeholder="Your Surname"
//                 value={userDetails.surname}
//                 onChange={handleInputChange}
//                 className="w-full p-2 mb-4 border rounded-lg"
//                 required
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Enter Your PassWord"
//                 value={userDetails.phone}
//                 onChange={handleInputChange}
//                 className="w-full p-2 mb-4 border rounded-lg"
//                 required
//               />
//               {phoneError && <p className="text-red-500">{phoneError}</p>}
              
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
//                 disabled={hasSubmitted}
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <FooterSection />
//     </div>
//   );
// };

// export default GiftExchange;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import HomeComp from '../components/HomeComp';
// import GiftExchangeInstructions from '../components/GiftExchangeInstructions';
// import FooterSection from '../components/Footer';

// // Static data for participants (only name, phone, and photo)
// const participantsData = [
//   { name: 'Sister Joyce Chifitah - Group Church', phone: '0978540835', photo: 'https://via.placeholder.com/150' },
//   { name: 'Brother Perry Mwape - Uptown Church', phone: '0971198536', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Abigail Luwawa - Group Church', phone: '0974334550', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Zoe Chirwa - Group Church', phone: '0975999207', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Sankhuleni Phiri - Group Church', phone: '0979383408', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Bertha Mukubesa - Group Church', phone: '0977949107', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Petronella Mula - Group Church ', phone: '0779896675', photo: 'https://via.placeholder.com/150' },
//   { name: 'Brother Abraham Israel Nasilele', phone: '0977219990', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Taonga Ngoma - Mass Media', phone: '0972768632', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Lucia Mwanza - Palm Drive', phone: '0976532220', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Margaret Edith Zulu - Uptown', phone: '0973164446', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Felistus Tandeo - Group Church', phone: '0977463439', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Esther Abrahams - Group Church', phone: '0979110853', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Ruth Mweemba - Group Church', phone: '0975043668', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Natasha Chewe - Group Church', phone: '0975616823', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Possible Mighty - Palm Drive', phone: '0971799653', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Rosemary Khondowe - Group Church', phone: '0764986712', photo: 'https://via.placeholder.com/150' },
//   { name: 'Brother James Chola - Group Church - Drummer', phone: '0976992870', photo: 'https://via.placeholder.com/150' },
//   { name: 'Brother Solomon Phiri - Group Church - Band', phone: '0976128175', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Felly Light (Felistus) from Palm Drive', phone: '0976356325', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Memory Nayame - Uptown', phone: '0979908797', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Mary malola T Banda - Uptown', phone: '0775767458', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Taonga Zulu - Group Church', phone: '0971001525', photo: 'https://via.placeholder.com/150' },
//   { name: 'Brother Micheal Bukasa - Group Church - Technical', phone: '0770346596', photo: 'https://via.placeholder.com/150' },
//   { name: 'Sister Louise Lufalanga -Group Church', phone: '09771279422', photo: 'https://via.placeholder.com/150' }
//   // { name: 'Sister Ruth Mweemba', phone: '567-890-1234', photo: 'https://via.placeholder.com/150' },
//   // { name: 'Sister Taonga Ngoma', phone: '678-901-2345', photo: 'https://via.placeholder.com/150' },
//   // { name: 'Sister Taonga Titus', phone: '789-012-3456', photo: 'https://via.placeholder.com/150' },
//   // { name: 'Sister Tamika', phone: '890-123-4567', photo: 'https://via.placeholder.com/150' },
//   // { name: 'King Gwen', phone: '901-234-5678', photo: 'https://via.placeholder.com/150' }
// ];


// const GiftExchange = () => {
//   const [selectedNumber, setSelectedNumber] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [userDetails, setUserDetails] = useState({ name: '', surname: '', phone: '' });
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [clickedParticipants, setClickedParticipants] = useState(new Set());
//   const [submittedPhones, setSubmittedPhones] = useState(new Set());
//   const [submittedSurnames, setSubmittedSurnames] = useState(new Set());
//   const [disabledButtons, setDisabledButtons] = useState(new Set());
//   const navigate = useNavigate();

//   // Load submission state from localStorage
//   useEffect(() => {
//     const storedSubmittedPhones = JSON.parse(localStorage.getItem('submittedPhones')) || [];
//     const storedSubmittedSurnames = JSON.parse(localStorage.getItem('submittedSurnames')) || [];
//     const storedClickedParticipants = JSON.parse(localStorage.getItem('clickedParticipants')) || [];

//     setSubmittedPhones(new Set(storedSubmittedPhones));
//     setSubmittedSurnames(new Set(storedSubmittedSurnames));
//     setClickedParticipants(new Set(storedClickedParticipants));
//   }, []);

//   const handleButtonClick = (number) => {
//     if (hasSubmitted) {
//       alert('You have already submitted your details!');
//       return;
//     }

//     if (submittedPhones.has(userDetails.phone) && submittedSurnames.has(userDetails.surname))  {
//       alert('This phone number has already been used!');
//       return;
//     }

//     if (clickedParticipants.has(number)) {
//       alert('This participant has already been picked!');
//       return;
//     }

//     setSelectedNumber(number);
//     setModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (submittedPhones.has(userDetails.phone) && submittedSurnames.has(userDetails.surname)) {
//       alert('You have already picked someone!');
//       return;
//     }

//     const selectedParticipant = participantsData[selectedNumber - 1];

//     try {
//       // Submit the user details to the backend
//       // const response = await axios.post('http://localhost:5000/api/submit-participant', {
//         const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/submit-participant`, {
//         name: userDetails.name,
//         surname: userDetails.surname,
//         phone: userDetails.phone,
//         pickedParticipantId: selectedNumber,
//       });

      

//       //If successful, navigate to the assigned participant page
//       navigate('/assigned-participant', {
//         state: { selectedParticipant, userDetails }
//       });
      
     

  

//       // Mark the participant as picked and hide the corresponding button
//       setHasSubmitted(true);
//       setClickedParticipants((prev) => new Set(prev.add(selectedNumber)));
//       setSubmittedPhones((prev) => new Set(prev.add(userDetails.phone)));
//       setSubmittedSurnames((prev) => new Set(prev.add(userDetails.surname)));
//       setModalOpen(false);

//       // Update localStorage to persist the state across page refreshes
//       localStorage.setItem('clickedParticipants', JSON.stringify([...clickedParticipants]));
//       localStorage.setItem('submittedPhones', JSON.stringify([...submittedPhones]));
//       localStorage.setItem('submittedSurnames', JSON.stringify([...submittedSurnames]));

//       // Disable the button after submission
//       setDisabledButtons((prev) => new Set(prev.add(selectedNumber)));
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         alert(error.response.data.message); // Show error from backend if exists
//       } else {
//         alert('Error submitting participant details');
//       }
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
    
//     <div className="bg-green-100 min-h-screen p-8">
//       <div>
//         <HomeComp/>
//         <GiftExchangeInstructions/>
//       </div>
//       <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Click On A Number</h2>

//       <div className="grid grid-cols-4 gap-4 mb-6 text-xl font-bold">
//         {[...Array(25).keys()].map((i) => (
//           !clickedParticipants.has(i + 1) ? (
//             <button
//               key={i}
//               onClick={() => handleButtonClick(i + 1)}
//               className={`bg-red-700 text-white p-8 rounded-xl hover:bg-red-900 transform transition duration-300 ${disabledButtons.has(i + 1) ? 'bg-gray-400 cursor-not-allowed' : ''}`}
//               disabled={disabledButtons.has(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ) : (
//             <button
//               key={i}
//               disabled
//               className="bg-gray-400 text-white p-4 rounded-xl transform transition duration-300"
//             >
//               Already Picked
//             </button>
//           )
//         ))}
//       </div>

//       {/* Pop-up form */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
//             <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-2xl">&times;</button>
//             <h3 className="text-xl font-semibold text-green-600 mb-4">Enter Your Details</h3>
//             <form onSubmit={handleFormSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your First Name"
//                 value={userDetails.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 mb-4 border rounded-lg"
//                 required
//               />
//               <input
//                 type="text"
//                 name="surname"
//                 placeholder="Your Surname"
//                 value={userDetails.surname}
//                 onChange={handleInputChange}
//                 className="w-full p-2 mb-4 border rounded-lg"
//                 required
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Your Phone Number"
//                 value={userDetails.phone}
//                 onChange={handleInputChange}
//                 className="w-full p-2 mb-4 border rounded-lg"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
//                 disabled={hasSubmitted} // Disable button if form is submitted
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//       <FooterSection/>
//     </div>
//   );
// };

// export default GiftExchange;