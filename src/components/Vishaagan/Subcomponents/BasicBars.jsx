import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BasicBars() {
    const [xAxis, setXAxis] = useState([]);
    const [seriesData, setSeriesData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/backend/Vishagan/getMedicalData.php', { withCredentials: true }) // Include credentials for session management
            .then(response => {
                const fetchedData = response.data;

                // Validate the response and handle potential errors
                if (fetchedData.status === 'error') {
                    console.error(fetchedData.message);
                    return; // Exit if there is an error
                }

                // Prepare xAxis and seriesData for the chart
                const keys = Object.keys(fetchedData);
                const values = keys.map(key => fetchedData[key]);

                setXAxis(keys);
                setSeriesData([{
                    data: values,
                    label: "Children Count",
                    barLabelDisplay: true,
                    barLabelAnchor: 'end',
                    barLabelPosition: 'outside',
                    barLabelOffset: 5,
                    color: 'skyblue' // Set the bar color here
                }]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Check if data is empty and render accordingly
    if (xAxis.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div style={{ marginTop: "3%" }}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: xAxis }]}
                yAxis={[{
                    scaleType: 'linear',
                    ticks: {
                        callback: (value) => Math.round(value), // Round Y-axis values to whole numbers
                    },
                }]}
                series={seriesData}
                width={500}
                height={300}
            />
        </div>
    );
}
