// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // Send data to the backend for signup
    //   const response = await axios.post('http://localhost:5000/api/auth/signup', {
    //     name,
    //     surname,
    //     phone,
    //   });


    try {
      // Send data to the backend for signup
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
        name,
        surname,
        phone,
      });
    
    
    

      alert(response.data.message);
      navigate('/login'); // Redirect to Gift Exchange if sign-up is successful
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-all duration-300 transform hover:scale-105">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-6">Sign Up to Participate in the LMM Zambia Christmas Gift Exchange</h2>
        {/* <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create an Account</h2> */}

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="PassWord"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <a href="/login" className="text-green-500 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;




// // src/pages/Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function SignUp() {
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send data to the backend for signup
//       const response = await axios.post('http://localhost:5000/api/auth/signup', {
//         name,
//         surname,
//         phone,
//       });

//       alert(response.data.message);
//       navigate('/gift-exchange'); // Redirect to Gift Exchange if sign-up is successful
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="signup-container">
//       <h2>Sign Up</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="First Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Surname"
//           value={surname}
//           onChange={(e) => setSurname(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default SignUp;



// import React from 'react'

// import SignUpComp from '../components/SignUpComp'

// function SignUp() {
//   return (
//     <div>
//       <SignUpComp/>
//     </div>
//   )
// }

// export default SignUp
