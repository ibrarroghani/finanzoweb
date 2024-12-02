'use client';
import React from 'react';
import UnProtectedRoute from '@/shared-components/auth/UnProtectedRoute';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ForgetPassword from './components/ForgetPassword';
import SignUpOtp from '../sign-up/components/SignUpOtp';
import NewPassword from './components/NewPassword';

const ForgetPasswordPage = () => {
  const step = useSelector((state: RootState) => state.forgetPassword.step);

  switch (step) {
    case 1:
      return (
        <UnProtectedRoute>
          <ForgetPassword />
        </UnProtectedRoute>
      );
    case 2:
      return (
        <UnProtectedRoute>
          <SignUpOtp />
        </UnProtectedRoute>
      );
    case 3:
      return (
        <UnProtectedRoute>
          <NewPassword />
        </UnProtectedRoute>
      );
    default:
      <div></div>;
  }
};

export default ForgetPasswordPage;
