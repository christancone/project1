import React from 'react';
import './Sidebar.css';
import lo from '../assets/lo.png';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';
import image11 from '../assets/11.png';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost/backend/Christan/logout.php', {
                method: 'POST', // Changed to POST
                credentials: 'include' // Ensure cookies are sent along with the request
            });

            if (response.ok) {
                const data = await response.json(); // Handle the JSON response if needed
                console.log(data); // Optional: Log the response
                window.location.href = "NilakshanParent";
            } else {
                const errorData = await response.json();
                console.error('Logout failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="sidebar">
            <div className="container">
                <div className="container1">
                    <div className="logo-container">
                        <img src={lo} alt="" className='logo' />
                    </div>
                    <div className="field">
                        <img src={image1} alt="" />
                        <Link to="/dashboard" className="link-style">
                            <h4>Dashboard</h4>
                        </Link>
                    </div>
                    <div className="field">
                        <img src={image2} alt="" />
                        <Link to="/childinfo" className="link-style">
                            <h4>Child info</h4>
                        </Link>
                    </div>
                    {/* <div className="field">
                        <img src={image4} alt="" />
                        <Link to="/leaveNote" className="link-style">
                            <h4>Leave notes</h4>
                        </Link>
                    </div> */}
                    <div className="field">
                        <img src={image5} alt="" />
                        <Link to="/chat" className="link-style">
                            <h4>Chat</h4>
                        </Link>
                    </div>
                </div>
                <div className="container2">
                    {/* <div className="field">
                        <img src={image6} alt="" />
                        <Link to="/attendee" className="link-style">
                            <h4>Attendees Details</h4>
                        </Link>
                    </div> */}
                    {/* <div className="field">
                        <img src={image7} alt="" className='foot_image' />
                        <Link to="/details" className="link-style">
                            <h4>Daycare Details</h4>
                        </Link>
                    </div> */}
                </div>
                <div className="container3">
                    <div className="field">
                        <img src={image8} alt="" />
                        <Link to="/bill" className="link-style">
                            <h4>Billing</h4>
                        </Link>
                    </div>
                    {/* <div className="field">
                        <img src={image9} alt="" />
                        <Link to="/feedback" className="link-style">
                            <h4>Feedback</h4>
                        </Link>
                    </div> */}
                    <div className="field">
                        <img src={image10} alt="" />
                        <Link to="/profile" className="link-style">
                            <h4>Profile</h4>
                        </Link>
                    </div>
                    <div className="field">
                        <img src={image11} alt="" />
                        <button onClick={handleLogout} className="link-style">
                            <h4>Logout</h4>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
