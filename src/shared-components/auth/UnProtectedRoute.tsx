'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface UnProtectedRouteProps {
  children: React.ReactNode;
}

const UnProtectedRoute = ({ children }: UnProtectedRouteProps) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  // Optionally show a loading spinner or message if it's still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? null : children;
};

export default UnProtectedRoute;
