import React from 'react'
import './Update.css'
import image from '../assets/Rectangle6.png'

const Update = () => {
  return (
    <div className="update">
        <div className="update-content">
            <p>Discover</p>
            <h3>Real time update to the parents about their child</h3>
            <p>
                Parents receive real-time updates on their child's activities, including meals, naps, and learning experiences, through our app. Instant notifications keep parents informed and connected, providing peace of mind throughout the day.
            </p>
        </div>
        <div className="image">
            <img src={image} alt="image" />
        </div>
    </div>
  )
}

export default Update;