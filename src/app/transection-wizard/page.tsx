import React from 'react';
import TransectionWizard from './components/TransectionWizard';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <TransectionWizard />
    </DashboardLayout>
  );
};

export default page;
