import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const parents = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const attendants = [2400, 1398, 8800, 3908, 4800, 3800, 4300, 3490, 3490];
const childcare = [3800, 600, 490, 250, 3900, 3800, 980];
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];

export default function BasicBarChart() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: parents, label: 'parents', id: 'paId' },
        { data: attendants, label: 'attendants', id: 'atId' },
        { data: childcare, label: 'childcare', id: 'ccId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
