import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Static data for participants (only name, phone, and photo)
const participantsData = [
  { name: 'Esther', phone: '123-456-7890', photo: 'https://via.placeholder.com/150' },
  { name: 'Abraham', phone: '234-567-8901', photo: 'https://via.placeholder.com/150' },
  { name: 'Solomon', phone: '345-678-9012', photo: 'https://via.placeholder.com/150' },
  { name: 'Peku', phone: '456-789-0123', photo: 'https://via.placeholder.com/150' },
  { name: 'Lisa', phone: '567-890-1234', photo: 'https://via.placeholder.com/150' },
  // Add more participants as needed...
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
      alert('This phone number has already been used!');
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

    if (submittedPhones.has(userDetails.phone) && submittedSurnames.has(userDetails.surname)) {
      alert('You have already picked someone!');
      return;
    }

    const selectedParticipant = participantsData[selectedNumber - 1];

    try {
      // Submit the user details to the backend
      const response = await axios.post('http://localhost:5000/api/submit-participant', {
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
        alert(error.response.data.message); // Show error from backend if exists
      } else {
        alert('Error submitting participant details');
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-green-100 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Gift Exchange</h2>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {[...Array(50).keys()].map((i) => (
          !clickedParticipants.has(i + 1) ? (
            <button
              key={i}
              onClick={() => handleButtonClick(i + 1)}
              className={`bg-red-600 text-white p-4 rounded-xl hover:bg-green-600 transform transition duration-300 ${disabledButtons.has(i + 1) ? 'bg-gray-400 cursor-not-allowed' : ''}`}
              disabled={disabledButtons.has(i + 1)}
            >
              {i + 1}
            </button>
          ) : (
            <button
              key={i}
              disabled
              className="bg-gray-400 text-white p-4 rounded-xl transform transition duration-300"
            >
              Already Picked
            </button>
          )
        ))}
      </div>

      {/* Pop-up form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-2xl">&times;</button>
            <h3 className="text-xl font-semibold text-green-600 mb-4">Enter Your Details</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your First Name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded-lg"
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Your Surname"
                value={userDetails.surname}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded-lg"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone Number"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
                disabled={hasSubmitted} // Disable button if form is submitted
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftExchange;