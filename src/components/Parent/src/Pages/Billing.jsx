import React, { useEffect, useState } from 'react';
import './Billing.css';

const Billing = () => {
    const [filterData, setFilterData] = useState({
        startDate: '',
        endDate: ''
    });

    const [billingData, setBillingData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch billing data from PHP backend on component mount
    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const response = await fetch('http://localhost:3000/project1/backend/parents/billing.php', {
                    credentials: 'include', // Ensure cookies are sent with the request
                });
                
                const data = await response.json();
                console.log("Fetched Data:", data); // Debugging output
                
                if (data.error) {
                    setErrorMessage(data.error); // Set error message if present
                } else {
                    setBillingData(data); // Set billing data if successful
                }
            } catch (error) {
                console.error('Error fetching billing data:', error);
                setErrorMessage('Error fetching billing data');
            }
        };
        
        fetchBillingData();
    }, []);

    const handleFilterChange = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value
        });
    };

    const applyFilter = () => {
        const { startDate, endDate } = filterData;
        if (startDate && endDate) {
            const filteredData = billingData.filter((item) => {
                const itemDate = new Date(item.last_paid_date); // Assuming you're filtering by last_paid_date
                return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
            });
            setBillingData(filteredData);
        } else {
            console.error('Please select both start and end dates.');
        }
    };

    return (
        <div className="billing-container">
            {/* Date Filter */}
            <div className="date-filter">
                <div className="field">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="date-input"
                        value={filterData.startDate}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="date-input"
                        value={filterData.endDate}
                        onChange={handleFilterChange}
                    />
                </div>

                <button onClick={applyFilter} className="filter-button">Apply Filter</button>
            </div>

            {/* Error Message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Billing Information Table */}
            <div className="bill">
                <h2>Billing Information</h2>
                <table className="billing-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Amount</th>
                            <th>Last Paid Date</th>
                            <th>Last Paid Amount</th>
                            <th>Outstanding Amount</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingData.map((item) => (
                            <tr key={item.user_id}>
                                <td>{item.user_id}</td>
                                <td>{item.amount}</td>
                                <td>{item.last_paid_date}</td>
                                <td>{item.last_paid_amount}</td>
                                <td>{item.outstanding_amt}</td>
                                <td>{item.due_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billing;
