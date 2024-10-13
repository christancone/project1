import React, { useState, useEffect } from 'react';
import './Childinfo.css';
import r4 from '../assets/r4.png';

const Childinfo = () => {
    const [childData, setChildData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ childMedicalReport: null });
    const [userImage, setUserImage] = useState(null);

    // Fetch child data from the PHP backend
    useEffect(() => {
        const fetchChildData = async () => {
            try {
                const response = await fetch('http://localhost:3000/project1/backend/parents/chilinfo.php', {
                    method: 'GET',
                    credentials: 'include', // Include cookies with requests
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                setChildData(data);
    
                // Fetch user data to get the image URL
                const userResponse = await fetch(`http://localhost:3000/project1/backend/parents/user.php?id=${data.userId}`, {
                    method: 'GET',
                    credentials: 'include', // Include cookies with requests
                });
    
                if (!userResponse.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const userData = await userResponse.json();
                if (userData.status === 'success') {
                    setUserImage(userData.data.child_image); // Assuming 'child_image' is the field that stores the image URL
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchChildData();
    }, []);
    

    const handleChangef = (event) => {
        const file = event.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            childMedicalReport: file,
        }));
    };

    const handleFileUpload = (event, field) => {
        // Logic for file upload goes here
        console.log(`Uploading ${field}:`, formData.childMedicalReport);
    };

    const renderChildInfo = (child) => (
        <div className="content2" key={child.child_name}>
            <div className="image">
                {userImage && <img src={`http://localhost:3000/project1/backend/parents/${userImage}`} alt="Child" />}
                <div className="name">
                    <h3>{child.child_name}</h3>
                    <h4>{child.dob}</h4>
                </div>
            </div>
            <div className="info">
                <div className="details">
                    <h3>Name: </h3>
                    <h4>{child.child_name}</h4>
                </div>
                <div className="details">
                    <h3>Date of Birth: </h3>
                    <h4>{child.dob}</h4>
                </div>
                <div className="details">
                    <h3>Allergies: </h3>
                    <h4>{child.allergies}</h4>
                </div>
                <div className="details">
                    <h3>Medications: </h3>
                    <h4>{child.medication}</h4>
                </div>
                <div className="details">
                    <h3>Medical Conditions: </h3>
                    <h4>{child.medical_info}</h4>
                </div>
                <div className="details">
                    <h3>Emergency Contact: </h3>
                    <h4>{child.emergency_contact}</h4>
                </div>
            </div>
        </div>
    );

    return (
        <div className="childinfo">
            <div className="content1">
                <h1>Child Info</h1>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && childData && (
                <div className="content">
                    {renderChildInfo(childData)}

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
                            My Baby has allergies to peanuts and dairy but requires no regular medications. She manages mild asthma under the care of Dr. Michael Smith. Emma's health is carefully monitored, and she follows a specific diet to avoid allergens. Regular check-ups with Dr. Smith ensure her conditions are well-managed, ensuring her overall well-being and safety.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Childinfo;
