'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import Spinner from '@/shared-components/Spinner';

interface UnProtectedRouteProps {
  children: React.ReactNode;
}

const UnProtectedRoute = ({ children }: UnProtectedRouteProps) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return !isAuthenticated ? <>{children}</> : null;
};

export default UnProtectedRoute;
