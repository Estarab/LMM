// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginComp = ({ onLogin }) => {
  const [userDetails, setUserDetails] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userDetails);
      // On successful login, save the token
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginComp;
