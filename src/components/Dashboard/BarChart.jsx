import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [5, 4, 3, 6.5, 4.7, 9.8, 2.5, 3.5, 7, 10, 5.5, 7],
        backgroundColor: '#1D62F0', // Blue
        borderRadius: 2,
      },
      {
        data: [3, 2, 8.5, 4.5, 3.7, 6, 3.6, 5.5, 6.5, 8, 6.3, 3.7],
        backgroundColor: '#ff646d', // Light red
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#555',
        },
        categoryPercentage: 0.6,  // group width
        barPercentage: 0.8,       // bar width inside group
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#777',
        },
        grid: {
          color: '#e0e0e0',
          borderDash: [4, 4],
        },
        
      },
    },
  };

  return (
    <div className="w-full h-full px-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
