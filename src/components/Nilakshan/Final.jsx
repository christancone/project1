import React, { useState } from 'react';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Footer from './Component/Footer';
import Login from './Component/Login';
import Parent from './Component/NilakshanParent'; // Import Parent
import OTP from './Component/OTP';
import CreateAccount from './Component/CreateAccount';
import './index.css';
import User from './Component/User';

const Final = () => {
  const [userRole, setUserRole] = useState(null); // State to hold user role

  return (
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                  path="/NilakshanParent"
                  element={<Parent onLoginSuccess={setUserRole} />} // Pass the setUserRole function
              />
              <Route path="/otp" element={<OTP />} />
              <Route path="/User" element={<User />} />
              <Route path="/CreateAccount" element={<CreateAccount />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default Final;
