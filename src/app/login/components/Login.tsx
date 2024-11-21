'use client';

import React from 'react';
import { Button } from 'antd';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/auth-slice';
import { useMsal } from '@azure/msal-react';
import Spinner from '@/shared-components/Spinner';

const LoginPage: React.FC = () => {
  const { instance, inProgress } = useMsal();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const isLoggingIn = loading || inProgress !== 'none';

  const handleLogin = () => {
    dispatch(login(instance));
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      {isLoggingIn ? (
        <Spinner />
      ) : (
        <Button type='primary' onClick={handleLogin} size='large'>
          Login with MSAL
        </Button>
      )}
    </div>
  );
};

export default LoginPage;
