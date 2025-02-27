import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AnalyticsCharts = ({ data }) => (
  <ResponsiveContainer width='100%' height={300}>
    <LineChart data={data}>
      <XAxis dataKey='date' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='count' stroke='#8884d8' />
    </LineChart>
  </ResponsiveContainer>
);

export default AnalyticsCharts;
