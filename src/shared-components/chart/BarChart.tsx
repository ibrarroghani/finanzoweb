'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface IBarChartProps {
  data: number[];
}

const BarChart: React.FC<IBarChartProps> = ({ data }) => {
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const modData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: '#E5E5E5',
        // borderColor: 'hsl(252, 82.9%, 67.8%)',
        borderWidth: 0,
        pointBackgroundColor: 'purple',
        pointBorderColor: 'purple',
        maxBarThickness: 40, // Maximum width for bars
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hides the grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Hides the grid lines on the y-axis
        },
      },
    },
  };

  return (
    <div className='min-h-[300px] w-full'>
      <Bar data={modData} options={options} />
    </div>
  );
};

export default BarChart;
