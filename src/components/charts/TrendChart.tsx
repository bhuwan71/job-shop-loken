// TrendChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface TrendChartProps {
  data: number[];
  labels: string[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data, labels }) => {
  const options = {
    chart: {
      id: 'trend-chart',
    },
    xaxis: {
      categories: labels,
    },
  };

  const series = [
    {
      name: 'Trend Series',
      data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
    />
  );
};

export default TrendChart;
