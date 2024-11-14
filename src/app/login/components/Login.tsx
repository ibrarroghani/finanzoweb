'use client';

import React from 'react';
import { Button, Spin } from 'antd';
// import { useMyAuth } from '@/providers/MyAuthProvider';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/AuthSlice';
import { useMsal } from '@azure/msal-react';

const LoginPage = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  // const { login, loading, user, isAuthenticated } = useMyAuth();
  // const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    dispatch(login(instance));
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div>
        <Button type='primary' onClick={handleLogin} size='large'>
          Login with MSAL
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
