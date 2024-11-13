'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyAuth } from '@/providers/MyAuthProvider'; // Use the MyAuthProvider context

interface UnProtectedRouteProps {
  children: React.ReactNode;
}

const UnProtectedRoute = ({ children }: UnProtectedRouteProps) => {
  const { isAuthenticated, loading } = useMyAuth();
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
