import React from 'react';
import Login from '@/app/login/components/Login';
import UnProtectedRoute from '@/shared-components/auth/UnProtectedRoute';

const LoginPage = () => {
  return (
    <UnProtectedRoute>
      <Login />
    </UnProtectedRoute>
  );
};

export default LoginPage;
