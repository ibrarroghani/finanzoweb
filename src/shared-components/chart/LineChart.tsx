import React from 'react';
import { Line } from 'react-chartjs-2';

interface ILineChartProps {
  labels: string[];
  data: number[];
}

const LineChart: React.FC<ILineChartProps> = ({ labels, data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function (value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: false,
      },
    ],
  };
  return (
    <div className='min-h-[200px]'>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default LineChart;
