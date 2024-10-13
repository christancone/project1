import * as React from 'react';
import './Billing.css';

const Billing = () => {
    const [filterData, setFilterData] = React.useState({
        startDate: '',
        endDate: ''
    });

    const [billingData, setBillingData] = React.useState([
        { id: 1, date: '2024-10-01', description: 'Service A', amount: '$100', status: 'Paid' },
        { id: 2, date: '2024-10-10', description: 'Service B', amount: '$200', status: 'Pending' },
        { id: 3, date: '2024-10-15', description: 'Service C', amount: '$150', status: 'Paid' },
    ]);

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
                const itemDate = new Date(item.date);
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

            {/* Billing Information Table */}
            <div className="bill">
                <h2>Billing Information</h2>
                <table className="billing-table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Last Paid Date</th>
                            <th>Last Paid Amount</th>
                            <th>Outstanding Amount</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.amount}</td>
                                <td>{item.date}</td>
                                <td>{item.description}</td>
                                <td>{item.status}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billing;
