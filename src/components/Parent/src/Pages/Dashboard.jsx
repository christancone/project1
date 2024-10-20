// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from '../Components/Navbar';

const Dashboard = () => {
    const [childrenData, setChildrenData] = useState([]);
    const [napData, setNapData] = useState([]);

    // Fetching the data from the backend
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost/backend/Parents/dashboard.php', {
                method: 'GET',
                credentials: 'include' // This includes cookies/session data in the request
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Fetched data:', data);

            setChildrenData(data.dining || []); // Ensure it's an array
            setNapData(data.naps || []); // Ensure it's an array
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Updated childrenData:', childrenData);
    }, [childrenData]);

    useEffect(() => {
        console.log('Updated napData:', napData);
    }, [napData]);

    return (
        <div className="dashboard">
            <div className="content">
                <h1>Hi, Parent</h1>
                <h2>Your Child's total history appears here</h2>
            </div>

            <div className="tables">
                {/* Dining Table */}
                <div className="food">
                    <table>
                        <thead>
                        <tr>
                            <th>Child Name</th>
                            <th>Food</th>
                            <th>Breakfast Status</th>
                            <th>Lunch Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {childrenData.length > 0 ? (
                            childrenData.map((child, index) => (
                                child.dining && child.dining.length > 0 ? (
                                    child.dining.map((dining, diningIndex) => (
                                        <tr key={`${index}-${diningIndex}`}>
                                            <td className='bold'>{child.firstname} {child.lastname}</td>
                                            <td className='bold'>{dining.food}</td>
                                            <td className={dining.breakfastStatus.includes('not complete') ? 'red' : 'green'}>
                                                {dining.breakfastStatus}
                                            </td>
                                            <td className={dining.lunchStatus.includes('not complete') ? 'red' : 'green'}>
                                                {dining.lunchStatus}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr key={index}>
                                        <td className='bold'>{child.firstname} {child.lastname}</td>
                                        <td className='bold'>N/A</td>
                                        <td className='green'>No Dining Data</td>
                                        <td className='green'>No Dining Data</td>
                                    </tr>
                                )
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No children data available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Nap Data Table */}
                <div className="nap">
                    <table>
                        <thead>
                        <tr>
                            <th>Child Name</th>
                            <th>Nap Duration</th>
                            <th>Nap Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {napData.length > 0 ? (
                            napData.map((nap, index) => (
                                <tr key={index}>
                                    <td className='bold'>{nap.firstname} {nap.lastname}</td>
                                    <td className='bold'>{nap.from_time} - {nap.to_time}</td>
                                    <td className={`nap-status ${nap.napStatus === 'Not perfect sleep' ? 'red' : 'green'}`}>
                                        {nap.napStatus}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No nap data available</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
