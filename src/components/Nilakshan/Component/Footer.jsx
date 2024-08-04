import React from 'react'
import './Footer.css'
import logo from '../assets/logo.png'
import a1 from '../assets/1.png'
import a2 from '../assets/2.png'
import a3 from '../assets/3.png'
import a4 from '../assets/4.png'
import a5 from '../assets/5.png'



const Footer = () => {
    return (
        <div className="footer">
            <div className="foot">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="content1">
                    <h3>About us</h3>
                    <p>Contact</p>
                    <p>FAQ</p>
                    <p>Blog</p>
                    <p>Terms</p>
                </div>
                <div className="content1">
                    <h3>Privacy</h3>
                    <p>Help centre </p>
                    <p>Community</p>
                    <p>Partner</p>
                    <p>Admin</p>
                </div>

                <div className="content1">
                    <h3>Advertise</h3>
                    <p>Investor</p>
                    <p>Accessibility</p>
                    <p>Cookie policy </p>
                    <p>Terms of use</p>
                </div>
                <div className="subscribe">
                    <h3>Subscribe</h3>
                    <p>Join our mailing list for the latest updates and news. </p>
                    <p className='boxxx'>
                        <input type="search" name="" id="subscribe" placeholder='Enter email address' />
                        <button className="button">Subscribe</button>
                    </p>
                    <p>By subscribing, you agree to our Privacy policy and consent to receive updates. </p>
                </div>
            </div>


            <div className="right">
                <hr />
                <div className="arrange">
                    <p className="type">
                        © All rights reserved.
                    </p>
                    <p className="type">
                        <u>Privacy policy</u>
                    </p>
                    <p className="type">
                        <u>Terms of service</u>
                    </p>
                    <p className="type">
                        <u>Cookies</u>
                    </p>
                    <div className="icon-containerrrrr">
                        <img src={a1} alt="1" className='iconnnn' />
                        <img src={a2} alt="2" className='iconnnn' />
                        <img src={a3} alt="3" className='iconnnn' />
                        <img src={a4} alt="4" className='iconnnn' />
                        <img src={a5} alt="5" className='iconnnn' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;