import React from 'react';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Footer from './Component/Footer';
import Login from './Component/Login';
import Parent from './Component/Parent';
import OTP from './Component/OTP';
import CreateAccount from './Component/CreateAccount';
import './index.css';

const Final = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/parent" element={<Parent />} />
            <Route path="/.home" element={<Home />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Final;