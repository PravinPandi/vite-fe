import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AnalyticsCharts = ({ data }) => (
  <LineChart width={600} height={300} data={data}>
    <XAxis dataKey='date' />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type='monotone' dataKey='count' stroke='#8884d8' />
  </LineChart>
);

export default AnalyticsCharts;
