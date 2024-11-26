'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface IUnProtectedRouteProps {
  children: React.ReactNode;
}

const UnProtectedRoute = ({ children }: IUnProtectedRouteProps) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  return !isAuthenticated ? <>{children}</> : null;
};

export default UnProtectedRoute;
