import React from 'react';
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const JobApplicationsChart = ({ data }: { data: any }) => {
  // Extract dates and number of jobs
  const labels = data?.map((item) => new Date(item.date).toLocaleDateString('en-GB')); // Format the date as DD/MM/YYYY
  const numberOfJobs = data?.map((item) => parseInt(item.number_of_jobs, 10)); // Number of jobs as integers

  // Define chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Jobs',
        data: numberOfJobs,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)', // Lighter fill for better aesthetics
        fill: true,
        tension: 0.3, // Smooth the line curve
        borderWidth: 2, // Thicker line for better visibility
        pointRadius: 4, // Increase point radius for better visibility
        pointHoverRadius: 6, // Make hover points larger
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio to control height
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Number of Jobs over Time',
        font: {
          size: 18, // Larger title for better readability
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Control the y-axis intervals
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', padding: '20px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default JobApplicationsChart;
