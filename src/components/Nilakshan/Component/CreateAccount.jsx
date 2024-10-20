import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './CreateAccount.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone_no: '',
        address: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        adminId: '', // Admin ID field
    });

    const [adminUsernames, setAdminUsernames] = useState([]); // Admin usernames
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAdminUsernames = async () => {
            try {
                const response = await axios.get('http://localhost/backend/satalan/fetch_admins.php');
                if (Array.isArray(response.data)) {
                    setAdminUsernames(response.data);
                } else {
                    NotificationManager.error('Invalid data received from server.');
                }
            } catch (error) {
                console.error('Error fetching admin usernames:', error);
                NotificationManager.error('Failed to fetch admin usernames.');
            }
        };

        fetchAdminUsernames();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Update state for the changed field
        });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.firstname) errors.firstname = 'First name is required';
        if (!formData.lastname) errors.lastname = 'Last name is required';
        if (!formData.phone_no) errors.phone_no = 'Phone number is required';
        if (!formData.email) errors.email = 'Email is required';
        if (formData.password !== formData.confirmPassword) errors.password = 'Passwords do not match';
        if (!formData.adminId) errors.adminId = 'Please select an Admin ID';
        console.log(formData.adminId);
        return errors;
    };

    const handleClick = async () => {
        setLoading(true); // Start loading state
        const newErrors = validateForm(); // Validate form fields

        // Check for validation errors
        if (Object.keys(newErrors).length > 0) {
            for (const [field, message] of Object.entries(newErrors)) {
                NotificationManager.error(message, field); // Notify validation errors
            }
            setLoading(false); // Stop loading state
            return; // Exit early on validation errors
        }

        try {
            console.log('Data sent to backend:', JSON.stringify(formData)); // Log the form data

            const response = await axios.post(
                'http://localhost/backend/satalan/registerForm.php',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json', // Specify content type
                    },
                    withCredentials: true, // Enable credentials for cross-origin requests
                }
            );

            console.log('Response Data:', response.data); // Log the response for debugging

            // Check if there are any errors in the response
            if (response.data.errors && typeof response.data.errors === 'object') {
                // Iterate through the errors object and show each error
                for (const [field, message] of Object.entries(response.data.errors)) {
                    NotificationManager.error(message, field); // Notify each error
                }
            } else {
                // If there are no errors, show success message and navigate
                NotificationManager.success('OTP has been sent successfully!');
                setTimeout(() => {
                    navigate('/OTP', { state: { email: formData.email } }); // Navigate to OTP page
                }, 1500);
            }
        } catch (error) {
            console.error('Error submitting form:', error); // Log error for debugging
            NotificationManager.error('An error occurred. Please try again.'); // Notify user of general error
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    return (
        <div className="CreateAccount">
            <div className="CreateAccount1">
                <h2>TinyToes at SriLanka</h2>
                <p>
                    At TinyToes, we are committed to providing a safe, nurturing, and stimulating environment that supports the holistic development of your child.
                </p>
            </div>

            <div className="CreateAccount2">
                <div className="content1">
                    <h4>Start for free</h4>
                    <h2>Create new account.</h2>
                    <div className="sec1">
                        <p>Already a Member?</p>
                        <Link to="/login">
                            <p className="Login">Login</p>
                        </Link>
                    </div>
                </div>
                <div className="content2">
                    <div className="row">
                        <div className="input-box">
                            <h4>First name</h4>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <h4>Last name</h4>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <h4>Phone no</h4>
                            <input
                                type="tel"
                                name="phone_no"
                                placeholder="Phone number"
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
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-box">
                            <h4>Email</h4>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-box">
                            <h4>Username</h4>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
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
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <h4>Confirm Password</h4>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-box">
                            <h4>Admin ID</h4>
                            <select
                                name="adminId"
                                value={formData.adminId}
                                onChange={handleChange} // Use the unified change handler
                            >
                                <option value="">Select Admin</option>
                                {adminUsernames.map((admin, index) => (
                                    <option key={index} value={admin}>
                                        {admin} {/* Admin username will be sent as adminId */}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={handleClick} disabled={loading}>
                            {loading ? 'Loading...' : 'Create Account'}
                        </button>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </div>
    );
};

export default CreateAccount;
