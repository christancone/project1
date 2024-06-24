import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (

    <BarChart
      xAxis={[{ scaleType: 'band', data: ['May', 'June', 'July'] }]}
      series={[ { data: [2, 5, 6] }]}
      width={500}
      height={300}
    />
  );
}
