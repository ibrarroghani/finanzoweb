'use client';

import React, { useState } from 'react';
import { Button, Spin, notification } from 'antd';
import { useMyAuth } from '@/providers/MyAuthProvider';

const LoginPage = () => {
  const { login, loading, user, isAuthenticated } = useMyAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login();
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      notification.error({
        message: 'Login Failed',
        description: 'There was an issue logging in. Please try again.',
        placement: 'topRight',
      });
    }
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spin size='large' />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div>
        <Button type='primary' onClick={handleLogin} size='large'>
          Login with MSAL
        </Button>
        {error && <p className='mt-2 text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
