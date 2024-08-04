import React from 'react'
import './Real.css'

const Real = () => {
  return (
    <>
      <div className="real">
        <div className="real1">

          <div className="real-content">
            <p>Discover</p>
            <h3>
              Accessing daycare locations is made easy with our built-in map feature.
            </h3>
          </div>

          <div className="real-content1">
            <p>
              Easily find daycare centres with our intuitive app. Simply input your location, and we'll display nearby options with ratings, reviews, and availability. Streamline your search, save favourites, and even schedule visits all in one place. Take the hassle out of daycare hunting with our convenient solution.Simplify your search and find the perfect daycare for your child with ease.
            </p>

            <button class="button">Learn more</button>
          </div>
          
        </div>


        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2212940274276!2d81.07679557590842!3d6.983191417648854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4618a1a9fec37%3A0x1dd900702229654b!2sUva%20Wellassa%20University%20of%20Sri%20Lanka!5e0!3m2!1sen!2suk!4v1718198261657!5m2!1sen!2suk"
            width="1500"
            height="600"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </>
  )
}

export default Real;
