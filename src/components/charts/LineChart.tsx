import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import apiInstance from '../../api/api';

const LineChart = () => {
  const [chartDataLine, setChartDataLine] = useState<any>([]);
  const [chartLabelsLine, setChartLabelsLine] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(
          `/customer-growth?year=${selectedYear}`,
        );
        if (response) {
          const { data, year } = response.data;

          // Extract month labels and values
          const labels = Object.keys(data);
          const series = Object.values(data).map(Number);

          setChartLabelsLine(labels);
          setChartDataLine(series);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const options = {
    xaxis: {
      categories: chartLabelsLine,
    },
  };

  return (
    <div className="line-chart-container px-3">
      <div className="flex justify-between pb-10">
      <h2 className=" font-bold px-5 py-2 text-black">
                Customers Growth
              </h2>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="yearDropdown"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
        >
          {Array.from(
            { length: 5 },
            (_, i) => new Date().getFullYear() - i,
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <Chart
        options={options}
        series={[{ data: chartDataLine }]}
        type="line"
        width="100%"
      />
    </div>
  );
};

export default LineChart;
