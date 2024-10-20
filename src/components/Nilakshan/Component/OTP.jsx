import React, { useState } from 'react';
import './OTP.css';
import mar3 from '../assets/Group1.png';
import mar4 from '../assets/Group2.png';
import mar5 from '../assets/Group3.png';
import mar6 from '../assets/Group4.png';
import mar7 from '../assets/Group5.png';
import mar8 from '../assets/Group6.png';
import Marquee from 'react-fast-marquee';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularWithValueLabel from './CircularWithValueLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTP = () => {
  const navigate = useNavigate();
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};
  const role = location?.state?.role || '';

  const handleEvent = (e) => {
    const { name, value } = e.target;

    // Only allow single digit or empty input
    if (/^\d$/.test(value) || value === '') {
      switch (name) {
        case 'otp1':
          setOtp1(value);
          if (value) {
            document.getElementsByName('otp2')[0].focus();
          }
          break;
        case 'otp2':
          setOtp2(value);
          if (value) {
            document.getElementsByName('otp3')[0].focus();
          } else {
            document.getElementsByName('otp1')[0].focus();
          }
          break;
        case 'otp3':
          setOtp3(value);
          if (value) {
            document.getElementsByName('otp4')[0].focus();
          } else {
            document.getElementsByName('otp2')[0].focus();
          }
          break;
        case 'otp4':
          setOtp4(value);
          if (!value) {
            document.getElementsByName('otp3')[0].focus();
          }
          break;
        default:
          break;
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginButton();
    }
  };

  const loginButton = async () => {
    const otpString = `${otp1}${otp2}${otp3}${otp4}`;
    const enteredOtp = parseInt(otpString, 10);
    console.log('Entered OTP:', enteredOtp);
    setLoading(true);

    try {
      const response = await axios.post(
          'http://localhost/backend/satalan/Otp.php',
          { enteredOtp, email, role },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
      );

      console.log('Response from server:', response.data);

      // Check if the server returned a message or errors
      if (response.status === 200) {
        // Check for the verification success message
        if (response.data.message === "Verification successful") {
          // Clear OTP fields and navigate
          setOtp1('');
          setOtp2('');
          setOtp3('');
          setOtp4('');
          toast.success("Verification successful!"); // Display success message
          console.log("Verification successful!"); // Log success message in console
          navigate('/NilakshanParent');
        } else if (response.data.errors) {
          // Display the first error message if it exists
          const firstErrorKey = Object.keys(response.data.errors)[0];
          const firstErrorMessage = response.data.errors[firstErrorKey];
          toast.error(firstErrorMessage); // Display the first error
          console.log(`Error: ${firstErrorKey} - ${firstErrorMessage}`); // Log the first error in console
        } else {
          toast.success("Verification successful!"); // Display success message
          console.log("Verification successful!"); // Log success message in console
          navigate('/NilakshanParent');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
      <div className="otp">
        <div className="otp1">
          <h2>Sri Lanka</h2>
          <p>
            In Sri Lanka, daycare centers cater to the needs of working parents by providing safe and nurturing environments for children. These centers offer various services, including early childhood education, nutritious meals, and supervised playtime...
          </p>
          <Marquee className="marquee" pauseOnHover>
            {/* Images */}
            <div className="img-marquee">
              <img src={mar3} alt="marquee image 1" />
            </div>
            <div className="img-marquee">
              <img src={mar4} alt="marquee image 2" />
            </div>
            <div className="img-marquee">
              <img src={mar5} alt="marquee image 3" />
            </div>
            <div className="img-marquee">
              <img src={mar6} alt="marquee image 4" />
            </div>
            <div className="img-marquee">
              <img src={mar7} alt="marquee image 5" />
            </div>
            <div className="img-marquee">
              <img src={mar8} alt="marquee image 6" />
            </div>
          </Marquee>
        </div>

        <div className="otp2">
          <h3>Verification code</h3>
          <div className="otpCode">
            <input
                type="text"
                name="otp1"
                className="subscribe"
                maxLength={1}
                value={otp1}
                onChange={handleEvent}
                onKeyPress={handleKeyPress}
                required
            />
            <input
                type="text"
                name="otp2"
                className="subscribe"
                maxLength={1}
                value={otp2}
                onChange={handleEvent}
                onKeyPress={handleKeyPress}
                required
            />
            <input
                type="text"
                name="otp3"
                className="subscribe"
                maxLength={1}
                value={otp3}
                onChange={handleEvent}
                onKeyPress={handleKeyPress}
                required
            />
            <input
                type="text"
                name="otp4"
                className="subscribe"
                maxLength={1}
                value={otp4}
                onChange={handleEvent}
                onKeyPress={handleKeyPress}
                required
            />
          </div>

          <button className="button" onClick={loginButton}>
            {loading ? <CircularWithValueLabel /> : 'Login'}
          </button>

          <div className="resend-container">
            <p className="resend">Resend</p>
            <p className="menu">Go to menu</p>
          </div>
        </div>

        <ToastContainer />
      </div>
  );
};

export default OTP;
