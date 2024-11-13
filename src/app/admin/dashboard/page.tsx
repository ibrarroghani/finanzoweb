import React from 'react';
import Dashboard from '@/app/admin/dashboard/components/Dashboard';
import ProtectedRoute from '@/shared-components/auth/ProtectedRoute';

const page = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default page;
