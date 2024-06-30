import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (
    <div style={{marginTop:"3%"}}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['May', 'June', 'July'] }]}
        series={[{
          data: [2, 5, 6],
          label: "New Additions",
          barLabelDisplay: true,
          barLabelAnchor: 'end',
          barLabelPosition: 'outside',
          barLabelOffset: 5,
        }]}
        width={500}
        height={300}
      />
    </div>
  );
}
