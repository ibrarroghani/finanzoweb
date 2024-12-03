import React from 'react';
import Dashboard from '@/app/dashboard/components/Dashboard';
//import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';
// import Header from '@/shared-components/layouts/Header';
import DashboardLayout from '@/shared-components/layouts/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default page;
