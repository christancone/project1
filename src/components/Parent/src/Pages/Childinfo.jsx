import React, { useState } from 'react';
import './Childinfo.css';
import r4 from '../assets/r4.png';

const Childinfo = () => {

    const [formData, setFormData] = useState({
        childMedicalReport: null,
    });

    const handleFileUpload = (e, field) => {
        e.preventDefault();
        const fileInput = document.getElementById(field);
        fileInput.click();
    };

    const handleChangef = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : null,
        });
    };

    return (
        <div className="childinfo">
            <div className="content">

                <div className="content1">
                    <h1>Child info.</h1>
                </div>

                <div className="content2">
                    
                    <div className="image">
                        <p>
                            <img src={r4} alt="Child" />
                            <h3>Mishaf</h3>
                            <h4>1 year 2 months</h4>
                        </p>
                    </div>

                    <div className="info">
                        <div className="details">
                            <h3>Name: </h3>
                            <h4>Emma Johnson</h4>
                        </div>
                        <div className="details">
                            <h3>Date of Birth: </h3>
                            <h4>January 15, 2022</h4>
                        </div>
                        <div className="details">
                            <h3>Allergies: </h3>
                            <h4>Peanuts, Dairy</h4>
                        </div>
                        <div className="details">
                            <h3>Medications: </h3>
                            <h4>None</h4>
                        </div>
                        <div className="details">
                            <h3>Medical Conditions: </h3>
                            <h4>Mild Asthma</h4>
                        </div>
                        <div className="details">
                            <h3>Emergency Contact: </h3>
                            <h4>Christan (0711111111)</h4>
                        </div>
                    </div>
                </div>

                <div className="edit">
                    <label htmlFor="Child_Medical">Child Medical Report:</label>
                    <div className="upload-container">
                        <input
                            required
                            type="file"
                            id="Child_Medical"
                            name="childMedicalReport"
                            style={{ display: 'none' }}
                            onChange={handleChangef}
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <div className="upload-box">
                            <input
                                type="text"
                                readOnly
                                placeholder="PDF/JPG/JPEG/PNG only allowed"
                                value={formData.childMedicalReport ? formData.childMedicalReport.name : ''}
                            />
                        </div>
                        <button
                            className="upload-button"
                            onClick={(e) => handleFileUpload(e, 'Child_Medical')}
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <div className="para">
                    <h3>Note: </h3>
                    <p>
                    My Baby has allergies to peanuts and dairy but requires no regular medications. She manages mild asthma under the care of Dr. Michael Smith. Emma's health is carefully monitored, and she follows a specific diet to avoid allergens. 
                    Regular check-ups with Dr. Smith ensure her conditions are well-managed, ensuring her overall well-being and safety.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Childinfo;