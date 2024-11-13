'use client';

import { useMyAuth } from '@/providers/MyAuthProvider'; // Make sure the path is correct
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useMyAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Optionally show a loading spinner or message if it's still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
