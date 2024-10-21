import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
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
            <div className="bill-table-container">
                <TableContainer component={Paper}>
                    <Table aria-label="Billing Information Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Last Paid Date</TableCell>
                                <TableCell>Last Paid Amount</TableCell>
                                <TableCell>Outstanding Amount</TableCell>
                                <TableCell>Due Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {billingData.length > 0 ? (
                                billingData.map((item, index) =>
                                    item.billing.map((bill, billIndex) => (
                                        <TableRow key={`${index}-${billIndex}`}>
                                            <TableCell>{item.firstname}</TableCell>
                                            <TableCell>{item.lastname}</TableCell>
                                            <TableCell>{bill.amount}</TableCell>
                                            <TableCell>{bill.last_paid_date}</TableCell>
                                            <TableCell>{bill.last_paid_amount}</TableCell>
                                            <TableCell>{bill.outstanding_amt}</TableCell>
                                            <TableCell>{bill.due_date}</TableCell>
                                        </TableRow>
                                    ))
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7}>No billing records found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


            {/* Totals Display */}
            <div className="totals">
                <h3>Total Amount: {totalAmount}</h3>
                <h3>Total Outstanding: {totalOutstanding}</h3>
            </div>
        </div>
    );
};

export default Billing;