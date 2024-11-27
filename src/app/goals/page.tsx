import React from 'react';
import Goal from './components/Goal';
import Header from '@/shared-components/layouts/Header';
import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';
const page = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Goal />
    </ProtectedRoute>
  );
};

export default page;
