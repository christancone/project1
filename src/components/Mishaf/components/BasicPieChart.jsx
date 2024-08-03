import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define color palette for the charts
const palette = ['#E7305B', '#0081B4', '#EFA3C8', '#E2979C', '#A239EA', '#473C33', '#8CDADB', '#F4F49E', '#AF2D2D'];

// Data for the charts
const parentsData = [
  { name: 'Western', value: 98 },
  { name: 'Central', value: 15 },
  { name: 'Southern', value: 20 },
  { name: 'Northern', value: 25 },
  { name: 'Eastern', value: 30 },
  { name: 'North Western', value: 35 },
  { name: 'North Central', value: 40 },
  { name: 'Uva', value: 45 },
  { name: 'Sabaragamuwa', value: 32 },
];

const attendantsData = [
  { name: 'Western', value: 120 },
  { name: 'Central', value: 18 },
  { name: 'Southern', value: 22 },
  { name: 'Northern', value: 28 },
  { name: 'Eastern', value: 32 },
  { name: 'North Western', value: 38 },
  { name: 'North Central', value: 42 },
  { name: 'Uva', value: 48 },
  { name: 'Sabaragamuwa', value: 52 },
];

const childcareData = [
  { name: 'Western', value: 148 },
  { name: 'Central', value: 16 },
  { name: 'Southern', value: 24 },
  { name: 'Northern', value: 26 },
  { name: 'Eastern', value: 34 },
  { name: 'North Western', value: 36 },
  { name: 'North Central', value: 44 },
  { name: 'Uva', value: 46 },
  { name: 'Sabaragamuwa', value: 54 },
];

// Component to render a single PieChart
const CustomPieChart = ({ title, data }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box flexGrow={1}>
      <Typography>{title}</Typography>
      <PieChart width={isMobile ? 300 : 400} height={isMobile ? 300 : 400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isMobile ? 80 : 100} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} (${((value / data.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(2)}%)`, name]} />
        <Legend formatter={(value) => <span style={{ color: '#333333' }}>{value}</span>} />
      </PieChart>
    </Box>
  );
};

// Main component to render all PieCharts
export default function BasicPieChart() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Stack direction={isMobile ? "column" : "row"} width="100%" textAlign="center" spacing={2}>
      <CustomPieChart title="Parents" data={parentsData} />
      <CustomPieChart title="Attendants" data={attendantsData} />
      <CustomPieChart title="Childcare" data={childcareData} />
    </Stack>
  );
}
