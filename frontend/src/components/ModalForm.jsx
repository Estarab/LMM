import React, { useState, useEffect } from 'react';

const ModalForm = ({ userDetails, setUserDetails, handleFormSubmit, hasSubmitted, closeModal }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    // Check if the button has already been disabled (persistent state)
    const buttonState = localStorage.getItem('buttonDisabled');
    if (buttonState === 'true') {
      setIsButtonDisabled(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isButtonDisabled) {
      alert('You have already submitted your details.');
      return;
    }
    handleFormSubmit(e); // Submit the form via the parent function
    setIsButtonDisabled(true); // Disable button after submission
    localStorage.setItem('buttonDisabled', 'true'); // Store state in localStorage
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 text-2xl">&times;</button>
        <h3 className="text-xl font-semibold text-green-600 mb-4">Enter Your Details</h3>
        <form onSubmit={handleSubmit}>
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
            disabled={isButtonDisabled || hasSubmitted}
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-4 hover:bg-green-700"
          >
            {isButtonDisabled || hasSubmitted ? 'Already Submitted' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
