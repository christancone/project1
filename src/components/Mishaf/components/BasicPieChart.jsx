import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useMediaQuery from '@mui/material/useMediaQuery';

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ['#E7305B', '#0081B4', '#EFA3C8', '#E2979C', '#A239EA', '#473C33', '#8CDADB', '#F4F49E', '#AF2D2D'];
const provinces = ['Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];

const data = [
  { name: 'Western', value: 10 },
  { name: 'Central', value: 15 },
  { name: 'Southern', value: 20 },
  { name: 'Northern', value: 25 },
  { name: 'Eastern', value: 30 },
  { name: 'North Western', value: 35 },
  { name: 'North Central', value: 40 },
  { name: 'Uva', value: 45 },
  { name: 'Sabaragamuwa', value: 50 },
];

export default function BasicPieChart() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  return (
    <Stack direction={isMobile ? "column" : "row"} width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography>Parents</Typography>
        <PieChart width={isMobile ? 300 : 400} height={isMobile ? 300 : 400}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isMobile ? 80 : 100} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${value} (${((value / data.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(2)}%)`, name]} />
        </PieChart>
      </Box>
      <Box flexGrow={1}>
        <Typography>Attendants</Typography>
        <PieChart width={isMobile ? 300 : 400} height={isMobile ? 300 : 400}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isMobile ? 80 : 100} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${value} (${((value / data.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(2)}%)`, name]} />
          <Legend formatter={(value) => <span style={{ color: '#333333' }}>{value}</span>} />
        </PieChart>
      </Box>
      <Box flexGrow={1}>
        <Typography>Childcare</Typography>
        <PieChart width={isMobile ? 300 : 400} height={isMobile ? 300 : 400}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isMobile ? 80 : 100} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${value} (${((value / data.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(2)}%)`, name]} />
        </PieChart>
      </Box>
    </Stack>
  );
}