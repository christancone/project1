import React, { useRef, useState } from 'react';
import './OTP.css';
import mar3 from '../assets/Group1.png';
import mar4 from '../assets/Group2.png';
import mar5 from '../assets/Group3.png';
import mar6 from '../assets/Group4.png';
import mar7 from '../assets/Group5.png';
import mar8 from '../assets/Group6.png';
import Marquee from "react-fast-marquee";

const OTP = () => {
  const [otp, setOtp] = useState(Array(5).fill(''));
  const inputsRef = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value.length === 1 && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    console.log('Entered OTP:', otpValue);
  
    fetch('http://localhost/toes/validate_otp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: otpValue }),
    })
    .then(response => {
      console.log('Full Response:', response); // Log the full response object
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Response Data:', data); // Log the entire response from server
      if (data.message === 'OTP validation successful.') {
        // Handle successful OTP validation
        alert('Sucesss!!!!!');
      } else {
        // Handle OTP validation failure
        alert('Invalid OTP. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  };

  return (
    <div className="otp">
      <div className="otp1">
        <h2>Sri Lanka</h2>
        <p>
          In Sri Lanka, daycare centers cater to the needs of working parents by providing safe and nurturing environments for children. These centers offer various services, including early childhood education, nutritious meals, and supervised playtime. With a focus on child development and socialization, daycare facilities in Sri Lanka often incorporate cultural and educational activities into their programs. Many centers also prioritize safety and hygiene standards, ensuring a healthy environment for children to thrive. From urban centers to rural communities, daycare options in Sri Lanka aim to support families by providing quality care and early childhood education opportunities for their children.
        </p>
        <Marquee className='marquee' pauseOnHover>
          <div className="img-marquee">
            <img src={mar3} alt="" />
          </div>
          <div className="img-marquee">
            <img src={mar4} alt="" />
          </div>
          <div className="img-marquee">
            <img src={mar5} alt="" />
          </div>
          <div className="img-marquee">
            <img src={mar6} alt="" />
          </div>
          <div className="img-marquee">
            <img src={mar7} alt="" />
          </div>
          <div className="img-marquee">
            <img src={mar8} alt="" />
          </div>
        </Marquee>
      </div>
      
      <div className="otp2">
        <h3>Verification code</h3>
        <div className="otpCode">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className='subscribe'
              maxLength={1}
              value={digit}
              ref={el => inputsRef.current[index] = el}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className="button" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}

export default OTP;
