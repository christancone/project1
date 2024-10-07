import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useNavigate,useLocation } from 'react-router-dom'


const Navbar = () => {
  const location = useLocation();
  const role = location?.state?.userRole || '';
  const navigate = useNavigate();

  console.log(role);
  
    const buttonClick = () => {
   
      navigate('/NilakshanParent')
    };

    const profilebutton = () => {
   
      if (role === 'Parent') {
        navigate('/ '); // Navigate to the route that renders the Parent component
      }
    };

  // const navigate1 = useNavigate();
  //   const button1 = () => {
  //     navigate('/home')
  //   };

  return (
    <>
    <div className="navbarr">
        <img src={logo} alt="logo" className='logo'/>
          <div className="links">
            
              <Link to = "/">Home</Link>
              <Link to = "/" >About</Link>
              <Link to = "/">Contact</Link>



               {role !== 'Parent' && (
          <button className="button" onClick={buttonClick}>Sign up</button>
        )}
               {role === 'Parent' && (
          <button className="button" onClick={profilebutton}>Profile</button>
        )}
        </div>
    </div>
    </>
  )
}

export default Navbar;