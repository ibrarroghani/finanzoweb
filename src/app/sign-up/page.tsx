import React from 'react';
import UnProtectedRoute from '@/shared-components/auth/UnProtectedRoute';
import SignUp from './components/SignUp';

const SignUpPage = () => {
  return (
    <UnProtectedRoute>
      <SignUp />
    </UnProtectedRoute>
  );
};

export default SignUpPage;
