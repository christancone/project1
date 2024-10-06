import React, { useState } from 'react';
import './LeaveNote.css';

const LeaveNote = () => {
    const [formData, setFormData] = useState({
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="leaveNote">
            <div className="content">
                {/* <h1>Leave a note.</h1> */}


                <div className="leave-field">
                    <label htmlFor="message" className="resumeField">Leave a Note:</label>
                    <textarea
                        id="message"
                        name="message"
                        className='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Leave a note for Your Attendee."
                    />

                    <button className="leave">Sent</button>
                </div>
            </div>
        </div>
    );
};

export default LeaveNote;