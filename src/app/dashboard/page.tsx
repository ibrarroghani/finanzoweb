import React from 'react';
import Dashboard from '@/app/dashboard/components/Dashboard';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default page;
