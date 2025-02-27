import React, { useEffect, useState } from 'react';
import { Card, DatePicker } from 'antd';
import api from '../api/api';
import AnalyticsCharts from '../components/AnalyticsCharts';

const { RangePicker } = DatePicker;

const Analytics = () => {
  const [userCount, setUserCount] = useState({ totalUsers: 0, newUsers: 0 });

  console.log(userCount);

  const [userTrends, setUserTrends] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [countResponse, trendsResponse] = await Promise.all([
        api.get('/analytics/users/count'),
        api.get('/analytics/users/trends'),
      ]);
      setUserCount(countResponse.data);
      setUserTrends(trendsResponse.data);

      console.log(
        countResponse.data,
        trendsResponse.data,
        'trendsResponse.data'
      );
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  return (
    <div>
      <Card title='User Metrics' style={{ marginBottom: 24 }}>
        <p>Total Users: {userCount.totalUsers}</p>
        <p>New Users (Last 7 Days): {userCount.newUsers}</p>
      </Card>
      <Card title='User Sign-Up Trends'>
        <AnalyticsCharts data={userTrends} />
      </Card>
    </div>
  );
};

export default Analytics;
