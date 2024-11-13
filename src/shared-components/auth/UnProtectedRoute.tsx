'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/msal/useAuth';

interface UnprotectedRouteProps {
  children: React.ReactNode;
}

const UnProtectedRoute = ({ children }: UnprotectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? null : children;
};

export default UnProtectedRoute;
