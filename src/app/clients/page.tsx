import React from 'react';
import Client from './components/Client';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <Client />
    </DashboardLayout>
  );
};

export default page;
