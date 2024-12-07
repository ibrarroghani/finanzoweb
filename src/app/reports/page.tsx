import React from 'react';
import Report from './components/Report';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <Report />
    </DashboardLayout>
  );
};

export default page;
