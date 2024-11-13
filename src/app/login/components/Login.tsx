/* eslint-disable no-console */
'use client';

import React from 'react';
import useAuth from '@/hooks/msal/useAuth';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import Spinner from '@/shared-components/Spinner';

const Login: React.FC = () => {
  const { instance, inProgress } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    instance
      .loginPopup()
      .then((response) => {
        console.log('response', response);
        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in.',
          placement: 'topRight',
        });
        router.push('/admin/dashboard');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  const isLoading = ['logout', 'startup', 'handleRedirect'].includes(
    inProgress
  );

  return (
    <div className='flex h-screen items-center justify-center'>
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          className='rounded-md bg-blue-500 p-4 text-white shadow-md hover:bg-blue-400'
          onClick={handleLogin}
        >
          Login with Azure AD
        </button>
      )}
    </div>
  );
};

export default Login;
