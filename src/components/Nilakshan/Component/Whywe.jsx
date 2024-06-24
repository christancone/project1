import React from 'react'
import './Whywe.css'
import image from '../assets/Rectangle5.png';

const Whywe = () => {
  return (
    <div className="why">
        <div className="why-content">
            <h2>Why We?</h2>
            <p>
                Choose us because we prioritize your child's safety, development, and happiness, offering certified caregivers, engaging programs, flexible scheduling, transparent communication, and a supportive community, ensuring your peace of mind while fostering your child's growth and well-being.
            </p>
            <img src={image} alt="image" />
        </div>

        <div className="why-content2">
            <h3>1. Helping Families:</h3>
            <p>
            We want to help families find good caregivers and nurses so they can take care of their loved ones without worrying too much.
            </p>

            <h3>2. Making Care Better:</h3>
            <p>
            By connecting families with qualified caregivers and nurses, we're making sure that children and patients get the best care possible.
            </p>

            <h3>3. Making Life Easier: </h3>
            <p>
            Our platform makes it easy for families to find the help they need, whenever they need it, making their lives a bit less stressful.
            </p>
        </div>
    </div>
  )
}

export default Whywe;