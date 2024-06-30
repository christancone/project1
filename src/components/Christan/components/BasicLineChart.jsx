import React from 'react';
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

const data = [
  { month: 'January', value: 33 },
  { month: 'February', value: 38 },
  { month: 'March', value: 38 },
  { month: 'May', value: 40 },
  { month: 'August', value: 47 },
  { month: 'October', value: 52 }
];

const minValue = Math.min(...data.map(item => item.value));

export default function BasicLineChart() {
  return (
    <ResponsiveContainer width="50%" height={315}>
      <LineChart
        width={250}
        height={150}
        data={data}
        margin={{
          top: 40, right: 50, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[minValue, 'dataMax']} />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
