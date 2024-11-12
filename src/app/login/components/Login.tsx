/* eslint-disable no-console */
'use client';

import React, { useEffect } from 'react';
import useAuth from '@/hooks/auth/useAuth';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const { instance, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

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

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <button
        className='rounded-md bg-blue-500 p-4 text-white shadow-md hover:bg-blue-400'
        onClick={handleLogin}
      >
        Login with Azure AD
      </button>
    </div>
  );
};

export default Login;
