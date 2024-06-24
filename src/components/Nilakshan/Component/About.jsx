import React from 'react'
import './About.css'
import image1 from '../assets/Group2.png'
import image2 from '../assets/Group3.png'
import image3 from '../assets/Group4.png'
import image4 from '../assets/Group5.png'
import image5 from '../assets/Group6.png'

const About = () => {
  return (
    <div className="about">
      <div className="content">
        <h2>Key Feature</h2>
        <p>
        Our daycare provides exceptional services with certified caregivers, ensuring a safe and nurturing environment. We offer flexible scheduling, an engaging curriculum, nutritious meals, and regular updates for parents. Our clean, secure facilities and enriching extracurricular activities support every child's development, while maintaining affordable pricing and fostering a strong community.
        </p>
        <div className='image-group'>
          <img src={image1} alt="image1" className='image1'/>
          <div className="grp1">
            <img src={image2} alt="image1" className='image2'/>
            <img src={image3} alt="image1" className='image2'/>
          </div>
          <div className="grp2">
            <img src={image4} alt="image1" className='image2'/>
            <img src={image5} alt="image1" className='image2'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;