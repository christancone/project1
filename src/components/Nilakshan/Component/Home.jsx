import React from 'react'
import './Home.css'
import image1 from '../assets/Group1.png'
import About from './About'
import Whywe from './Whywe'
import Real from './Real'
import Update from './Update'
import Faq from './Faqs'

const Home = () => {
  return (
    <>
    <div className="home">
      
      <div className="home-content">
          <h2>Tiny Toes</h2>
          <p>An online platform facilitating childcare and nursing services, connecting families with qualified caregivers and healthcare professionals. </p>
        </div>
        <img src={image1} alt="image1" className='image1'/>
        
    </div>

    <div className="about-content">
      <About />
    </div>


    <div className="why-content">
      <Whywe />
    </div>

    <div className="update">
      <Update />
    </div>
    
    <div className="real-content">
      <Real />
    </div>

    <div className="faq-content">
      <Faq />
    </div>
    </>
  )
}

export default Home;