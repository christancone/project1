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


const email = location.state?.email ||'';

const handleEvent =  (e)=>{
    const { name, value } = e.target;
    switch(name){
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


useEffect(()=>{
    //set value parent.jsx store email take 
    const storedValue = localStorage.getItem('email');

    axios.post('http://localhost:3000/backend/Login_php/login.php',{
        data:storedValue
    }).then(response =>{
        console.log('Response from server:', response.data);
    }).catch(error =>{
        console.error('Erroe sending data: ',error);
    });

},[])
 





const loginButton = async () => {
    const enteredOtp = `${otp1}${otp2}${otp3}${otp4}`;
    console.log('Entered OTP:', enteredOtp);

    

    setLoading(true); // Start loading

    try {
        const response = await axios.post(
            'http://localhost:3000/backend/Login_php/otpVerify.php',
            { enteredOtp ,email},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Response from server:', response.data);

        if (response.status === 200) {
            if (response.data.status === 'success') {
                navigate('/Login'); // Navigate to the '/Login' route after a successful response
            } else {
                setError(response.data.message || 'An unexpected error occurred.');
                navigate('/OTP'); // Redirect to OTP page
            }
        } else {
            console.error('Unexpected response status:', response.status);
            setError('An unexpected error occurred.');
            navigate('/OTP'); // Redirect to OTP page
        }
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
            setError('Server Error: ' + (error.response.data.message || 'An error occurred.'));
        } else if (error.request) {
            console.error('Network Error:', error.request);
            setError('Network Error: Please check your connection.');
        } else {
            console.error('Error:', error.message);
            setError('Error: ' + error.message);
        }
    } finally {
        setLoading(false); // Stop loading
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
                <p className="resend">Resend</p>
                <p className="menu">Go to menu</p>
              </div>
          </div>
    </div>
  )
}

export default OTP;