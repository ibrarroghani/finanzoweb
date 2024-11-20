'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/AuthSlice';
import { useMsal } from '@azure/msal-react';
import { usePlaidLink } from 'react-plaid-link';
import useGetPublicToken from '@/hooks/data-hooks/plaid/useGetPublicToken';
import useGetAccessToken from '@/hooks/data-hooks/plaid/useGetAccessToken';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const { instance } = useMsal();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(logout(instance));

  const {
    data: ResponsePublicToken,
    isError: isPublicTokenError,
    error: publicTokenError,
  } = useGetPublicToken();

  if (isPublicTokenError)
    console.log('error from public token', (publicTokenError as Error).message);

  const {
    mutate: accessToken,
    isError: isAccessTokenError,
    error: accessTokenError,
  } = useGetAccessToken();

  if (isAccessTokenError)
    console.log('error from access token', (accessTokenError as Error).message);

  useEffect(() => {
    if (ResponsePublicToken?.data) {
      const { link_token } = ResponsePublicToken.data;
      setToken(link_token);
    }
  }, [ResponsePublicToken]);

  const onSuccess = useCallback(
    (publicToken: string) => {
      accessToken({ public_token: publicToken });
    },
    [accessToken]
  );

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <div className='items flex h-screen flex-col items-center justify-center'>
      <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>

      <button onClick={() => open()} disabled={!ready}>
        <p>Link account</p>
      </button>
      <button
        className='rounded-md bg-green-400 p-2 text-white'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
