import React from 'react';
import TransectionWizard from './components/TransectionWizard';
import Header from '@/shared-components/layouts/Header';
import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';

const page = () => {
  return (
    <ProtectedRoute>
      <Header />
      <TransectionWizard />
    </ProtectedRoute>
  );
};

export default page;
