'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
