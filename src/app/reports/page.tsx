import React from 'react';
import Report from './components/Report';
import Header from '@/shared-components/layouts/Header';
import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';

const page = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Report />
    </ProtectedRoute>
  );
};

export default page;
