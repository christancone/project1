import React from 'react'
import './Faqs.css'

const Faq = () => {
  return (
    <div className="faq">
        <div className="faq-contain">
                <h3>Frequently Asked Questions</h3>
                <br />
                <h4>Find answers to common questions and concerns.</h4>
                <br />
        </div>
        <hr/>
        <div className="faq-contain1">
            <h5>How does it work?</h5>
            <p>
            Daycare providers register on our app, listing their services and availability. Parents log in, search for daycare options 
            based on location and other criteria, and contact or book directly through the app for their childcare needs.
            </p>

            <hr/>

            <h5>Is it free?</h5>
            <p>
            Yes, obvious is completely free for the parents. There are no hidden charges or subscription fees.
            </p>
            <hr/>

            <h5>Can I search by location?</h5>
            <p>
            Yes, you can search for daycare centers by location using our integrated map feature in the app.
            </p>
            <hr/>

            <h5>Can parents receive real-time updates about their child's activities through the app?</h5>
            <p>
            Yes, parents receive real-time updates on their child's activities through the app, including meals, naps, medical 
            update and learning experiences, ensuring they stay informed throughout the day.
            </p>
            <hr/>

            <h5>Is my personal data safe?</h5>
            <p>
            We prioritise the security and safety of parents' and their children's personal data with advanced encryption and 
            strict privacy protocols, ensuring confidentiality and peace of mind for all users.
            </p>
            <hr/>

        </div>

        <div className="faq-contain">
                <h3>Still have questions?</h3>
                <br />
                <h4>Contact our support team for further assistance</h4>
                <br />
                <button class="button">Contact</button>
        </div>
        
        
    </div>
  )
}

export default Faq;