import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartOptions, Plugin } from 'chart.js';

export interface IDoughnutChartProps {
  data: number[];
  backgroundColor: string[];
}

const DoughnutChart: React.FC<IDoughnutChartProps> = ({
  data,
  backgroundColor,
}) => {
  // Calculate progress percentage
  const progress = Math.round(
    (data[0] / data.reduce((a, b) => a + b, 0)) * 100
  );

  const dData = {
    datasets: [
      {
        data,
        backgroundColor,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
    // cutout: '70%', // Size of the white center area
  };

  // Custom plugin to render text in the center
  const centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      const fontSize = Math.min(width, height) / 10; // Adjust font size dynamically

      ctx.save();
      ctx.font = `bold ${fontSize}px Arial`; // Responsive font size
      ctx.fillStyle = '#000'; // Text color
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(`${progress}%`, width / 2, height / 2);
      ctx.restore();
    },
  };

  return (
    <Doughnut data={dData} options={options} plugins={[centerTextPlugin]} />
  );
};

export default DoughnutChart;
