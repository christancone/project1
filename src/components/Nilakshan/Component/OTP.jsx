import React from 'react'
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


const OTP = () => {
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
                <input type="text" name="" className='subscribe' maxLength={1}/>
                <input type="text" name="" className='subscribe' maxLength={1}/>
                <input type="text" name="" className='subscribe' maxLength={1}/>
                <input type="text" name="" className='subscribe' maxLength={1}/>
                <input type="text" name="" className='subscribe' maxLength={1}/>
              </div>

              <button className="button">Login</button>
          </div>
    </div>
  )
}

export default OTP;