import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    newSubscriptions: [],
    activeUsers: [],
    revenue: [],
  });

  useEffect(() => {
    // In a real application, this would fetch data from your backend
    const fetchStats = async () => {
      // Mock data
      const mockData = {
        newSubscriptions: [10, 15, 20, 25, 30, 35, 40],
        activeUsers: [100, 120, 150, 180, 200, 220, 250],
        revenue: [500, 750, 1000, 1250, 1500, 1750, 2000],
      };
      setStats(mockData);
    };

    fetchStats();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Platform Statistics',
      },
    },
  };

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'New Subscriptions',
        data: stats.newSubscriptions,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Active Users',
        data: stats.activeUsers,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Revenue ($)',
        data: stats.revenue,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.activeUsers[stats.activeUsers.length - 1]}</p>
        </div>
        <div className="stat-card">
          <h3>New Subscriptions (Last 7 Days)</h3>
          <p>{stats.newSubscriptions.reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>${stats.revenue[stats.revenue.length - 1]}</p>
        </div>
      </div>
      <div className="chart-container">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;