import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation  } from 'react-router-dom';
import './CreateAccount.css';
import Marquee from "react-fast-marquee";
import mar3 from '../assets/Group1.png';
import mar4 from '../assets/Group2.png';
import mar5 from '../assets/Group3.png';
import mar6 from '../assets/Group4.png';
import mar7 from '../assets/Group5.png';
import mar8 from '../assets/Group6.png';
import CircularWithValueLabel from './CircularWithValueLabel'; // Import CircularWithValueLabel
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; // Import notification styles

const CreateAccount = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const role = location?.state?.role || '';
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone_no: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: role,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClick = async () => {
        setLoading(true);

        // Validate form fields
        const newErrors = {};
        if (!formData.firstname) newErrors.firstname = 'First name is required.';
        if (!formData.lastname) newErrors.lastname = 'Last name is required.';
        if (!formData.phone_no) newErrors.phone_no = 'Phone number is required.';
        if (!formData.address) newErrors.address = 'Address is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        if (!formData.password) newErrors.password = 'Password is required.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

        if (Object.keys(newErrors).length > 0) {
            for (const [field, message] of Object.entries(newErrors)) {
                NotificationManager.error(message, field);
            }
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/project1/backend/Login_php/Login_php/Otp.php', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.errors) {
                if (typeof response.data.errors === 'string') {
                    NotificationManager.error(response.data.errors);
                } else {
                    for (const [key, message] of Object.entries(response.data.errors)) {
                        NotificationManager.error(message, key);
                    }
                }
            } else {
                // Notify the user of successful OTP sending
                NotificationManager.success('OTP has been sent successfully!');

                // Wait a short time before navigating to ensure the notification is displayed
                setTimeout(() => {
                    navigate('/otp', { state: { email: formData.email, role: formData.role } });
                }, 1500); // Adjust delay as needed

            }
        } catch (error) {
            console.error('Error submitting form:', error);
            NotificationManager.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="CreateAccount">
            <div className="CreateAccount1">
                <h2>TinyToes at SriLanka</h2>
                <p>
                    At TinyToes, we are committed to providing a safe, nurturing, and stimulating environment that supports the holistic development of your child. Our daycare center offers a comprehensive range of services designed to meet the diverse needs of children and families, ensuring that parents can have peace of mind while they are at work.
                </p>
                <br />
                <h4>Child-Centered Approach to Learning and Development</h4>
                <p>
                    At TinyToes, we recognize that the early years of a child's life are crucial for their overall development. Our programs are designed to foster cognitive, emotional, social, and physical growth in a supportive and engaging environment. We follow a child-centered approach, where the unique needs, interests, and abilities of each child are at the core of our curriculum. Through age-appropriate activities, we aim to nurture creativity, critical thinking, and problem-solving skills in children, setting a strong foundation for their future learning.
                </p>
                <h4>Comprehensive Early Childhood Education</h4>
                <p>
                    We understand that early childhood education plays a pivotal role in shaping a child's future. Our team of experienced educators is dedicated to delivering high-quality early education that is both enriching and enjoyable. The curriculum at TinyToes is carefully crafted to incorporate a variety of learning experiences, including language development, math, science, and the arts. Additionally, we place a strong emphasis on cultural awareness and socialization, helping children develop a sense of community and respect for diversity.
                </p>
                <Marquee className='marquee' pauseOnHover>
                    <div className="img-marquee"><img src={mar3} alt="Marquee Image 1" /></div>
                    <div className="img-marquee"><img src={mar4} alt="Marquee Image 2" /></div>
                    <div className="img-marquee"><img src={mar5} alt="Marquee Image 3" /></div>
                    <div className="img-marquee"><img src={mar6} alt="Marquee Image 4" /></div>
                    <div className="img-marquee"><img src={mar7} alt="Marquee Image 5" /></div>
                    <div className="img-marquee"><img src={mar8} alt="Marquee Image 6" /></div>
                </Marquee>
            </div>

            <div className="CreateAccount2">
                <div className="content1">
                    <h4>Start for free</h4>
                    <h2>Create new account.</h2>
                    <div className="sec1">
                        <p>Already a Member?</p>
                        <a href="./login">
                            <p className="Login">Login</p>
                        </a>
                    </div>
                </div>
                <div className="content2">
                    <div className="row">
                        <div className="input-box">
                            <h4>First name</h4>
                            <input
                                type="text"
                                name="firstname"
                                placeholder='First name'
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <h4>Last name</h4>
                            <input
                                type="text"
                                name="lastname"
                                placeholder='Last name'
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <h4>Phone no</h4>
                            <input
                                type="text"
                                name="phone_no"
                                placeholder='Phone number'
                                value={formData.phone_no}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <h4>Address</h4>
                            <input
                                type="text"
                                name="address"
                                placeholder='Address'
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <h4>Email</h4>
                            <input
                                type="text"
                                name="email"
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <h4>Password</h4>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <h4>Confirm Password</h4>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder='Confirm Password'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button className="button" onClick={handleClick}>
                        {loading ? <CircularWithValueLabel /> : 'Create Account'}
                    </button>
                </div>
            </div>

            <NotificationContainer />
        </div>
    );
};

export default CreateAccount;