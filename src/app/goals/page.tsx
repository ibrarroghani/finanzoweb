import React from 'react';
import Goal from './components/Goal';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';
import { GoalPageProvider } from './context/GoalPageContext';
const page = () => {
  return (
    <DashboardLayout>
      <GoalPageProvider>
        <Goal />
      </GoalPageProvider>
    </DashboardLayout>
  );
};

export default page;
