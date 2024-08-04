import React from 'react'
import './Sidebar.css'
import lo from '../assets/lo.png'
import image1 from '../assets/1.png'
import image2 from '../assets/2.png'
import image3 from '../assets/3.png'
import image4 from '../assets/4.png'
import image5 from '../assets/5.png'
import image6 from '../assets/6.png'
import image7 from '../assets/7.png'
import image8 from '../assets/8.png'
import image9 from '../assets/9.png'
import image10 from '../assets/10.png'
import image11 from '../assets/11.png'


const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="container">
            <div className="logo_container">
                <img src={lo} alt="" className='logo'/>
            </div>

            <div className="container1">

                    <div className="field">
                        <img src={image1} alt="" />
                        <h4>Dashboard</h4>
                    </div>

                    <div className="field">
                        <img src={image2} alt="" />
                        <h4>Child info</h4>
                    </div>

                    <div className="field">
                        <img src={image3} alt="" />
                        <h4>Child Status</h4>
                    </div>

                    <div className="field">
                        <img src={image4} alt="" />
                        <h4>Leave notes</h4>
                    </div>

                    <div className="field">
                        <img src={image5} alt="" />
                        <h4>Chat</h4>
                    </div>

            </div>


            <div className="container2">

                    <div className="field">
                        <img src={image6} alt="" />
                        <h4>Attendees Details</h4>
                    </div>

                    <div className="field">
                        <img src={image7} alt=""  className='foot_image'/>
                        <h4>Daycare Details</h4>
                    </div>

            </div>

            <div className="container3">


                <div className="field">
                    <img src={image8} alt="" />
                    <h4>Billing & Payments</h4>
                </div>

                <div className="field">
                    <img src={image9} alt="" />
                    <h4>Feedback</h4>
                </div>

                <div className="field">
                    <img src={image10} alt="" />
                    <h4>Profile</h4>
                </div>

                <div className="field">
                    <img src={image11} alt="" />
                    <h4>Logout</h4>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Sidebar;