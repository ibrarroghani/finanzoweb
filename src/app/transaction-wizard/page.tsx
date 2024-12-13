import React from 'react';
import TransactionWizard from './components/TransectionWizard';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <TransactionWizard />
    </DashboardLayout>
  );
};

export default page;
