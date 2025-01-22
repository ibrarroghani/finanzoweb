import React from 'react';
import Dashboard from '@/app/dashboard/components/Dashboard';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';
import { DashboardPageProvider } from './context/DashboardPageContext';

const page = () => {
  return (
    <DashboardLayout>
      <DashboardPageProvider>
        <Dashboard />
      </DashboardPageProvider>
    </DashboardLayout>
  );
};

export default page;
