import React, { useEffect, useState } from 'react';
import './Billing.css';

const Billing = () => {
    const [billingData, setBillingData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalOutstanding, setTotalOutstanding] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch billing data from PHP backend on component mount
    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                const response = await fetch('http://localhost/backend/parents/billing.php', {
                    credentials: 'include',

                });

                // Check if the response is in the correct format (JSON)
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text(); // Read the response as text for debugging
                    console.error('Unexpected response:', text); // Log the unexpected response
                    throw new TypeError('Expected JSON, but received something else');
                }

                const data = await response.json();
                console.log("Fetched Data:", data);

                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setBillingData(data.billing_data);
                    setTotalAmount(data.total_amount);
                    setTotalOutstanding(data.total_outstanding);
                }
            } catch (error) {
                console.error('Error fetching billing data:', error);
                setErrorMessage('Error fetching billing data');
            }
        };


        fetchBillingData();
    }, []);

    return (
        <div className="billing-container">
            {/* Error Message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Billing Information Table */}
            <div className="bill">
                <h2>Billing Information</h2>
                <table className="billing-table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Amount</th>
                        <th>Last Paid Date</th>
                        <th>Last Paid Amount</th>
                        <th>Outstanding Amount</th>
                        <th>Due Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {billingData.length > 0 ? (
                        billingData.map((item, index) =>
                            item.billing.map((bill, billIndex) => (
                                <tr key={`${index}-${billIndex}`}>


                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{bill.amount}</td>
                                    <td>{bill.last_paid_date}</td>
                                    <td>{bill.last_paid_amount}</td>
                                    <td>{bill.outstanding_amt}</td>
                                    <td>{bill.due_date}</td>
                                </tr>
                            ))
                        )
                    ) : (
                        <tr>
                            <td colSpan="7">No billing records found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {/* Totals Display */}
                <div className="totals">
                    <h3>Total Amount: {totalAmount}</h3>
                    <h3>Total Outstanding: {totalOutstanding}</h3>
                </div>
            </div>
        </div>
    );
};

export default Billing;