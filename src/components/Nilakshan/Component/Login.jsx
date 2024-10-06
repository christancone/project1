import React from 'react'
import './Login.css'
import img1 from '../assets/Vector.png'
import img2 from '../assets/Vector1.png'
import img3 from '../assets/Vector2.png'
import lo from '../assets/lo.png'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const navigate = useNavigate();
  const buttonClick = (role) => {
    console.log(role);
    navigate('/parent', { state: { role } });
  };

  return (
      <div className="login">


        <div className="back-image">
          <img src={lo} alt="" />
        </div>


        <div className="login-container">
          <div className="content1">
            <div className="head">
              <img src={img1} alt="" />
              <h3>Daycare</h3>
            </div>
            <div className="para">
              <p>
                In Sri Lanka, daycare centres cater to the needs of working parents by providing safe and nurturing environments for children.
              </p>
            </div>

            <div className="head">
              <img src={img2} alt="" />
              <h3>Features</h3>
            </div>
            <div className="para">
              <p>
                In Sri Lanka, daycare centres cater to the needs of working parents by providing safe and nurturing environments for children.
              </p>
            </div>

            <div className="head">
              <img src={img3} alt="" />
              <h3>Updates</h3>
            </div>
            <div className="para">
              <p>
                In Sri Lanka, daycare centres cater to the needs of working parents by providing safe and nurturing environments for children.
              </p>
            </div>

          </div>


          <div className="vertical-line">
          </div>


          <div className="sign">
            <div className="buttons">
              <h2>Login or Sign up</h2>
              <button className='button' onClick={() => buttonClick('Parent')}>as Parent</button>
              <button className='button' onClick={() => buttonClick('Attendant')}>as Attendant</button>
              <button className='button' onClick={() => buttonClick('Daycare Admin')}>as Daycare Admin</button>
              <button className='button' onClick={() => buttonClick('ServiceProvider')}>ServiceProvider</button>

            </div>
          </div>
        </div>
      </div>
  )
}

export default Login;