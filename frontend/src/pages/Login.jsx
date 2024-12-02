// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // Check if the phone number exists in the database
    //   const response = await axios.get('http://localhost:5000/api/auth/check', {
    //     params: { phone },
    //   });

    try {
      // Check if the phone number exists in the database
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/check`, {
        params: { phone },
      });
    

      // If the phone number is found, navigate to the GiftExchangePicker
      if (response.data.message === 'User is signed up!') {
        navigate('/gift-exchange');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-all duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your Password"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-purple-500 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;




// // src/pages/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Check if the phone number exists in the database
//       const response = await axios.get('http://localhost:5000/api/auth/check', {
//         params: { phone },
//       });

//       // If the phone number is found, navigate to the GiftExchangePicker
//       if (response.data.message === 'User is signed up!') {
//         navigate('/gift-exchange');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter your phone number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;




// import React from 'react'

// import LoginComp from '../components/LoginComp'

// function Login() {
//   return (
//     <div>
//       <LoginComp/>
//     </div>
//   )
// }

// export default Login
