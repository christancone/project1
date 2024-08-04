import React from 'react'
import './Attendee.css'

import a1 from '../assets/a1.png'
import a2 from '../assets/a2.png'
import a3 from '../assets/a3.png'
import a4 from '../assets/a4.png'
import a5 from '../assets/a5.png'


const Attendee = () => {
    return (
        <div className="attendee">
            <div className="content">
                <h1>Attendees Details,</h1>


                <div className="details1">
                    <p>
                        <img src={a1} alt="attendee" />
                        <div className="name">
                            <h3>Mishaf</h3>
                            <h4>Founder of Diva Daycare</h4>
                            <h4 className='quote'>
                                "with love, patience, and unwavering support. Our mission is to nurture their potential, one tiny step at a time."
                            </h4>
                        </div>
                    </p>
                </div>

                <div className="attendant">
                    <div className="details2">
                        <p>
                            <img src={a2} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>


                    <div className="details2">
                        <p>
                            <img src={a3} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>

                    <div className="details2">
                        <p>
                            <img src={a4} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>

                    <div className="details2">
                        <p>
                            <img src={a5} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>

                    <div className="details2">
                        <p>
                            <img src={a1} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>


                </div>








                <div className="attendant">
                    <div className="details2">
                        <p>
                            <img src={a5} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>


                    <div className="details2">
                        <p>
                            <img src={a3} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>

                    <div className="details2">
                        <p>
                            <img src={a2} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>

                    <div className="details2">
                        <p>
                            <img src={a4} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>

                    <div className="details2">
                        <p>
                            <img src={a2} alt="attendee" />
                            <div className="name">
                                <h3>Mishaf</h3>
                                <h4>Attendant</h4>
                            </div>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Attendee;