'use client';
import React, { useEffect } from 'react';
import useAuth from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import Spinner from '@/shared-components/Spinner';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <Spinner />
    </div>
  );
};

export default Home;
