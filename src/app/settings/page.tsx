import React from 'react';
import Setting from './components/Setting';
import Header from '@/shared-components/layouts/Header';
import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';

const page = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Setting />
    </ProtectedRoute>
  );
};

export default page;
