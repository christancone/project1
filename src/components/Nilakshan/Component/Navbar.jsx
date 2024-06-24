import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const navigate = useNavigate();
    const buttonClick = () => {
      navigate('/login')
    };

  const navigate1 = useNavigate();
    const button1 = () => {
      navigate('/home')
    };

  return (
    <>
    <div className="navbar">
        <img src={logo} alt="logo" className='logo' onClick={button1}/>
          <div className="links">
            
              <Link to = "/">Home</Link>
              <Link to = "/" >About</Link>
              <Link to = "/">Contact</Link>
              <button className="button" onClick={buttonClick}>Sign up</button>
        </div>
    </div>
    </>
  )
}

export default Navbar;