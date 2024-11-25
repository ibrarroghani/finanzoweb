'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '@/store/slices/auth-slice';
import { useRouter } from 'next/navigation';
import Spinner from '@/shared-components/Spinner';

const LogoutSuccess = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearAuth());
    router.push('/login');
  }, [dispatch, router]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <Spinner />
    </div>
  );
};

export default LogoutSuccess;
