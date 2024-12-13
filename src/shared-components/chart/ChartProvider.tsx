'use client';
import React from 'react';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export default ChartProvider;
