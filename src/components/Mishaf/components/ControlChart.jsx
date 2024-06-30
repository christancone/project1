import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { month: 'Jan', profit: 4000 },
  { month: 'Feb', profit: 3000 },
  { month: 'Mar', profit: 2000 },
  { month: 'Apr', profit: 2780 },
  { month: 'May', profit: 1890 },
  { month: 'Jun', profit: 2390 },
  { month: 'Jul', profit: 3490 },
  { month: 'Aug', profit: 2000 },
  { month: 'Sep', profit: 2780 },
  { month: 'Oct', profit: 1890 },
  { month: 'Nov', profit: 2390 },
  { month: 'Dec', profit: 3490 },
];

const ControlChart = () => {
  return (
    <Box className="p-4 bg-white shadow-md rounded-lg">
      <ResponsiveContainer width={500} height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ControlChart;