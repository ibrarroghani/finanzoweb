import React from 'react';
import Client from './components/Client';
import Header from '@/shared-components/layouts/Header';
import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';

const page = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Client />
    </ProtectedRoute>
  );
};

export default page;
