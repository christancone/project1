import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatMonth = (month) => {
  const [year, monthNum] = month.split('-');
  return monthNames[parseInt(monthNum, 10) - 1] || month; // Fallback to original value if formatMonth fails
};

export default function BasicLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/backend/Vishagan/getMonthData.php')
      .then(response => {
        console.log('Fetched data:', response.data);  // Debugging log
        const fetchedData = response.data.map(item => ({
          month: formatMonth(item.month),
          value: item.value
        }));
        setData(fetchedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Log the data to verify it's correctly formatted
  console.log('Data for chart:', data);

  const minValue = Math.min(...data.map(item => item.value), 0);

  return (
    <ResponsiveContainer width="100%" height={315}>
      <LineChart
        data={data}
        margin={{
          top: 40, right: 50, left: 60, bottom: 70, // Adjust margins as needed
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          tick={{ angle: -45, textAnchor: 'end', fontSize: 12 }} 
          interval={0} // Show all ticks
        />
        <YAxis domain={[minValue, 'dataMax']} />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
