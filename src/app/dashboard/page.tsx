import React from 'react';
import Dashboard from '@/app/dashboard/components/Dashboard';
//import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';
import Header from '@/shared-components/layouts/Header';

const page = () => {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
};

export default page;
