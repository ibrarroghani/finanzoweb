import React from 'react';
import Dashboard from '@/app/dashboard/components/Dashboard';
import { DashboardPageProvider } from './context/DashboardPageContext';

const page = () => {
  return (
    <DashboardPageProvider>
      <Dashboard />
    </DashboardPageProvider>
  );
};

export default page;
