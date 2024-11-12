'use client';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/auth/useAuth';
import Spinner from '@/shared-components/Spinner';

interface authProps {
  children: React.ReactNode;
}

const Auth = ({ children }: authProps) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (isLoading)
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );

  return <>{children}</>;
};

export default Auth;
