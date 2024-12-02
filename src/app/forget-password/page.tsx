'use client';
import React from 'react';
import UnProtectedRoute from '@/shared-components/auth/UnProtectedRoute';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ForgetPassword from './components/ForgetPassword';
import NewPassword from './components/NewPassword';
import ForgetPasswordOtp from './components/ForgetPasswordOtp';

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
          <ForgetPasswordOtp />
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
