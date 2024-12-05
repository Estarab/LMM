// src/App.js
import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GiftExchangePicker from './components/GiftExchangePicker';
import AssignedParticipant from './pages/AssignedParticipant';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import GiftExchange from './pages/GiftExchange';
import SuccessPage from './pages/SuccessPage';
import LoginPart from './pages/LoginPart';

function App() {
  const [user, setUser] = useState(null);

  // Load user from local storage (if any) on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user if exists
    }
  }, []);

  // Handle successful login or signup
  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); // Save user info to localStorage
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user info from localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Login and SignUp Routes */}
        <Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />

        {/* Only allow access to GiftExchangePicker if the user is logged in */}
        <Route
          path="/"
          element={user ? <GiftExchangePicker handleLogout={handleLogout} /> : <Navigate to="/gift-exchange" />}
        />

        <Route path="/assigned-participant" element={<AssignedParticipant />} />
        <Route path="/gift-exchange" element={<GiftExchange/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/login-part" element={<LoginPart/>} />
        
      </Routes>
    </Router>
  );
}

export default App;



// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import GiftExchangePicker from './components/GiftExchangePicker';
// import AssignedParticipant from './pages/AssignedParticipant';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<GiftExchangePicker />} />
//         <Route path="/assigned-participant" element={<AssignedParticipant />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
