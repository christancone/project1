import React from 'react'
import './Dashboard.css'
import Navbar from '../Components/Navbar';

import r1 from '../assets/r1.png';
import r2 from '../assets/r2.png';
import r3 from '../assets/r3.png';


const Dashboard = () => {
    <Navbar />
  return (
    <div className="dashboard">
        <div className="content">
            <h1>Dear Parents,</h1>
            <p>
            We are delighted to welcome you to our Child Care Management Online Platform. Here, you can easily access important information about your child's activities, progress, and overall well-being. Our goal is to ensure you stay connected and informed every step of the way.
            </p>
            <div className="image-container">
                <div className="content1">
                    <h3>Real-Time Updates</h3>
                    <img src={r1} alt="" />
                </div>

                <div className="content1">
                    <h3>Real-Time Updates</h3>
                    <img src={r2} alt="" />
                </div>

                <div className="content1">
                    <h3>Real-Time Updates</h3>
                    <img src={r3} alt="" />
                </div>
            </div>

            <div className="para">
                <p>
                Access detailed information about your daycare, including attendee details and medical conditions, securely. 
                Stay informed and connected with our platform, ensuring your child's well-being and safety at all times.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;