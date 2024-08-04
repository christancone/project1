import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BasicBars() {
  const [data, setData] = useState({});
  const [xAxis, setXAxis] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/Project1/getMedicalData.php')
      .then(response => {
        const fetchedData = response.data;
        
        // Validate data to ensure it's in correct format
        const validatedData = Object.fromEntries(
          Object.entries(fetchedData).filter(([key, value]) => !isNaN(value))
        );
        
        // Update state with validated data
        setData(validatedData);
        
        // Prepare xAxis and seriesData for the chart
        const keys = Object.keys(validatedData);
        const values = keys.map(key => validatedData[key]);

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
        series={seriesData}
        width={500}
        height={300}
      />
    </div>
  );
}
