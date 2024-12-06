import React from 'react';
import Goal from './components/Goal';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';
const page = () => {
  return (
    <DashboardLayout>
      <Goal />
    </DashboardLayout>
  );
};

export default page;
