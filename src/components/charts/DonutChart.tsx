import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import apiInstance from '../../api/api';

const DonutChart = () => {
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get("/sahakari-customer-gender-distribution");
        if (response) {
          const dataArray = Object.values(response.data);
          setChartData(dataArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const chartLabels = ['Female', 'Male'];

  const options = {
    labels: chartLabels,
  };

  return (
    <Chart
      options={options}
      series={chartData}
      type="donut"
      width="90%"
    />
  );
};

export default DonutChart;
