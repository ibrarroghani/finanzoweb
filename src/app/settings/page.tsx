import React from 'react';
import Setting from './components/Setting';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <Setting />
    </DashboardLayout>
  );
};

export default page;
