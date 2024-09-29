import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const JobApplicationsBarChart = ({ data }: { data: any }) => {
  // Extract positions and number of applications
  const labels = data?.map((item) => item.position.en); // Use position name in English as labels
  const numberOfApplications = data?.map((item) =>
    parseInt(item.number_of_applications, 10),
  ); // Number of applications as integers

  // Define chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Applications',
        data: numberOfApplications,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Set bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Define chart options with adjusted aspectRatio
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows manual height/width control
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Job Applications by Position',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div style={{ height: '400px', padding: '20px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default JobApplicationsBarChart;
