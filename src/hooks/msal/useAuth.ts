'use client';
import { useMsal } from '@azure/msal-react';

const useAuth = () => {
  const { accounts, instance, inProgress } = useMsal();

  const isAuthenticated = accounts.length > 0;
  const user = isAuthenticated ? accounts[0] : null;

  return { user, isAuthenticated, instance, inProgress };
};

export default useAuth;
