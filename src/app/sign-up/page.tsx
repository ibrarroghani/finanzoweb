'use client';
import React from 'react';
import UnProtectedRoute from '@/shared-components/auth/UnProtectedRoute';
import SignUp from './components/SignUp';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import SignUpOtp from './components/SignUpOtp';

const SignUpPage = () => {
  const step = useSelector((state: RootState) => state.signUp.step);

  switch (step) {
    case 1:
      return (
        <UnProtectedRoute>
          <SignUp />
        </UnProtectedRoute>
      );
    case 2:
      return (
        <UnProtectedRoute>
          <SignUpOtp />
        </UnProtectedRoute>
      );
    default:
      <div></div>;
  }
};

export default SignUpPage;
