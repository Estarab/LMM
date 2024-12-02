import React, { useState, useEffect } from 'react';

const SubmitButtonComponent = () => {
  // State to track if the button is disabled
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Use effect to check if the button should be disabled after the page refresh
  useEffect(() => {
    // Check localStorage if button was previously disabled
    const buttonState = localStorage.getItem('buttonDisabled');
    if (buttonState === 'true') {
      setIsButtonDisabled(true);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit form data (e.g., making a POST request)
    // axios.post(...)

    // Disable the button after form submission and store state in localStorage
    setIsButtonDisabled(true);
    localStorage.setItem('buttonDisabled', 'true'); // Save state in localStorage
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <input
          type="text"
          placeholder="Your input here"
          // Add more input fields as necessary
        />
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="bg-green-600 text-white py-2 px-4 rounded-lg"
        >
          {isButtonDisabled ? 'Already Submitted' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default SubmitButtonComponent;
