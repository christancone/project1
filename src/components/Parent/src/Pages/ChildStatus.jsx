import './ChildStatus.css'
import React, { useState } from 'react';

const ChildStatus = () => {
    // Create separate state variables for each button
    const [foodClicked, setFoodClicked] = useState(false);
    const [medsClicked, setMedsClicked] = useState(false);
    const [sleepingClicked, setSleepingClicked] = useState(false);
    const [washroomClicked, setWashroomClicked] = useState(false);
    const [diaperClicked, setDiaperClicked] = useState(false);

    return (
        <div className="childStatus">
            
            <div className="content">
                <div className="head">
                    <h1>Child Status</h1>
                </div>

                <div className="components">
                    <button
                        className={`btn ${foodClicked ? 'clicked' : ''}` }
                        onClick={() => setFoodClicked(!foodClicked)}>
                    </button>
                    <h3>Take Food</h3>
                </div>

                {/* <div className="components">
                    <button
                        className={`btn ${medsClicked ? 'clicked' : ''}`}
                        onClick={() => setMedsClicked(!medsClicked)}>
                    </button>
                    <h3>Take Medicines</h3>
                </div> */}

                <div className="components">
                    <button
                        className={`btn ${sleepingClicked ? 'clicked' : ''}`}
                        onClick={() => setSleepingClicked(!sleepingClicked)}>
                    </button>
                    <h3>Child Sleeping</h3>
                </div>

                {/* <div className="components">
                    <button
                        className={`btn ${washroomClicked ? 'clicked' : ''}`}
                        onClick={() => setWashroomClicked(!washroomClicked)}>
                    </button>
                    <h3>Go to washroom</h3>
                </div>

                <div className="components">
                    <button
                        className={`btn ${diaperClicked ? 'clicked' : ''}`}
                        onClick={() => setDiaperClicked(!diaperClicked)}>
                    </button>
                    <h3>Diaper Change</h3>
                </div> */}
                <div className="footer">
                    <h3>(You Can get real time update via this Check-box)</h3>
                </div>
            </div>
        </div>
    )
}

export default ChildStatus;