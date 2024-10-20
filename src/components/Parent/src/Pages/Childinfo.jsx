import React, { useState, useEffect } from 'react';
import './Childinfo.css';

const Childinfo = () => {
    const [childData, setChildData] = useState([]);  // Array to hold multiple children's data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChildData = async () => {
            try {
                const response = await fetch('http://localhost/backend/parents/childinfo.php', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data && data.length > 0) {
                    setChildData(data); // Set child data if fetched successfully
                } else {
                    throw new Error('No child data found.');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChildData();
    }, []);

    // Render multiple children's information cards
    const renderChildrenCards = () => (
        childData.map((child, index) => (
            <div className="card" key={index}>
                <div className="card-content">
                    <div className="card-details">
                        <h3>Name:</h3>
                        <h4>{child.firstname} {child.lastname}</h4>
                    </div>
                    <div className="card-details">
                        <h3>Date of Birth:</h3>
                        <h4>{child.dob}</h4>
                    </div>
                    <div className="card-details">
                        <h3>Medical Info:</h3>
                        <h4>{child.medical_info}</h4>
                    </div>
                </div>
            </div>
        ))
    );

    return (
        <div className="childinfo">
            <div className="content1">
                <h1>Child Info</h1>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {/* Render multiple children's information */}
            {!loading && childData.length > 0 && (
                <div className="card-container">
                    {renderChildrenCards()}
                </div>
            )}
        </div>
    );
};

export default Childinfo;
