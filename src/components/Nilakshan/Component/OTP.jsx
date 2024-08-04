import React, { useEffect, useState } from 'react'
import './OTP.css'


import mar3 from '../assets/Group1.png'
import mar4 from '../assets/Group2.png'
import mar5 from '../assets/Group3.png'
import mar6 from '../assets/Group4.png'
import mar7 from '../assets/Group5.png'
import mar8 from '../assets/Group6.png'


import image2 from '../assets/a1.png'
import image3 from '../assets/g1.png'
import Marquee from "react-fast-marquee"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'


const OTP = () => {
    const navigate = useNavigate();
    const[otp1,setOtp1]=useState('');
const[otp2,setOtp2]=useState('');
const[otp3,setOtp3]=useState('');
const[otp4,setOtp4]=useState('');
const [enteredOtp, setEnteredOtp] = useState('');
const [otp, setOtp] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const location = useLocation();


const { email } = location.state || {};

const handleEvent =  (e)=>{
    const { name, value } = e.target;
    if (/^\d$/.test(value) || value === '') {
        switch (name) {
            case 'otp1':
                setOtp1(value);
                break;
            case 'otp2':
                setOtp2(value);
                break;
            case 'otp3':
                setOtp3(value);
                break;
            case 'otp4':
                setOtp4(value);
                break;
            default:
                break;
        }
    }
}



 



const loginButton = async () => {
    const otpString = `${otp1}${otp2}${otp3}${otp4}`;
    const enteredOtp = parseInt(otpString, 10);
    console.log('Entered OTP:', enteredOtp);
    setLoading(true);
    try {
        const response = await axios.post(
            'http://localhost:3000/project1/backend/Login_php/registerForm.php',
            { enteredOtp, email },
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('Response from server:', response.data);

        if (response.status === 200 && response.data.message === 'Verification successful') {
            navigate('/Login');
        } else {
            setError(response.data.errors || response.data.message || 'An unexpected error occurred.');
        }
    } catch (error) {
        setError('An error occurred. Please try again later.');
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};
     
  return (
    <div className="otp">
        <div className="otp1">
            <h2>Srilanka</h2>
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
  <input
    type="text"
    name="otp1"
    className='subscribe'
    maxLength={1}
    value={otp1 } 
    onChange={handleEvent}
    required
  />
  <input
    type="text"
    name="otp2"
    className='subscribe'
    maxLength={1}
    value={otp2 } 
    onChange={handleEvent}
    required
  />
  <input
    type="text"
    name="otp3"
    className='subscribe'
    maxLength={1}
    value={otp3 } 
    onChange={handleEvent}
    required
  />
  <input
    type="text"
    name="otp4"
    className='subscribe'
    maxLength={1}
    value={otp4 } 
    onChange={handleEvent}
    required
  />
</div>


              <button className="button" onClick={loginButton}>Login</button>

              <div className="resend-container">
                {/* <p className="resend">Resend</p> */}
                <p className="menu">Go to menu</p>
              </div>
          </div>
    </div>
  )
}

export default OTP;