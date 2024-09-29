// PieChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const options = {
    labels,
  };

  const series = data;

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="100%"
    />
  );
};

export default PieChart;
