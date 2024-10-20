import React, { useState } from 'react';
import './Parent.css';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useLocation } from 'react-router-dom';
// Import images
import mar3 from '../assets/Group1.png';
import mar4 from '../assets/Group2.png';
import mar5 from '../assets/Group3.png';
import mar6 from '../assets/Group4.png';
import mar7 from '../assets/Group5.png';
import mar8 from '../assets/Group6.png';
import image2 from '../assets/a1.png';
import image3 from '../assets/g1.png';

const NilakshanParent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location?.state?.role || '';

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRegister = () => {
    navigate('/CreateAccount', { state: { role } });
  };
  const otpButton = async () => {
    if (!email || !password) {
      NotificationManager.error('Please enter both email and password.');
      return;
    }
  
    setLoading(true);
  
    try {
      console.log("Email:", email, "Password:", password);
  
      const response = await axios.post(
        'http://localhost:3000/new/project1/backend/Login_php/Login_php/login.php',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
  
      console.log('Full response from server:', response);  // Log full response object
  
      if (response.data.message === 'Login successful') {
        NotificationManager.success('Login successful!', 'Success', 3000);
        console.log('Response data from server:', response.data);
  
        const userRole = response.data.role;
        console.log('User role:', userRole);
  
        // Redirect or handle successful login based on role
        navigate('/', { state: { role: userRole } });
      } else {
        NotificationManager.error(response.data.errors || 'Login failed.');
        console.log('Error response data from server:', response.data);  // Log response errors
      }
  
    } catch (error) {
      if (error.response) {
        NotificationManager.error('Server error. Please try again.');
        console.log('Error response:', error.response);  // Log server response errors
      } else if (error.request) {
        NotificationManager.error('Network error. Please try again.');
        console.log('Error request:', error.request);  // Log network errors
      } else {
        NotificationManager.error('An unexpected error occurred.');
        console.log('General error:', error.message);  // Log general errors
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="parent">
      <div className="parent1">
        <h2>Daycares in Sri Lanka</h2>
        <p>
          In Sri Lanka, daycare centers cater to the needs of working parents by providing safe and nurturing environments for children. These centers offer various services, including early childhood education, nutritious meals, and supervised playtime. With a focus on child development and socialization, daycare facilities in Sri Lanka often incorporate cultural and educational activities into their programs. Many centers also prioritize safety and hygiene standards, ensuring a healthy environment for children to thrive. From urban centers to rural communities, daycare options in Sri Lanka aim to support families by providing quality care and early childhood education opportunities for their children.
        </p>
        <Marquee className='marquee' pauseOnHover>
          <div className="img-marquee"><img src={mar3} alt="" /></div>
          <div className="img-marquee"><img src={mar4} alt="" /></div>
          <div className="img-marquee"><img src={mar5} alt="" /></div>
          <div className="img-marquee"><img src={mar6} alt="" /></div>
          <div className="img-marquee"><img src={mar7} alt="" /></div>
          <div className="img-marquee"><img src={mar8} alt="" /></div>
        </Marquee>
      </div>

      <div className="parent2">
        <h3>Your email or Phone number</h3>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder='Email'
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder='Password'
        />
        <button className="button" onClick={otpButton}>
          {loading ? <CircularProgress size={30} /> : 'Login'}
        </button>
        <div className="or">
          <hr />
          <p>or</p>
          <hr />
        </div>
        <button className='sign-button'>
          <img src={image3} alt="Google" /> Continue with Google
        </button>
        <button className='sign-button'>
          <img src={image2} alt="Apple" /> Continue with Apple
        </button>
        <div className="parent3">
          <p>Don't have an account?</p>
          <p className="signup" onClick={handleRegister}>Sign up</p>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default NilakshanParent;
