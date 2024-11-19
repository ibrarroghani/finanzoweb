'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/AuthSlice';
import { useMsal } from '@azure/msal-react';
import { usePlaidLink } from 'react-plaid-link';
import useGetPlaidPublicToken from '@/hooks/data-hooks/plaid/useGetPlaidPublicToken';
import useGetPlaidAccessToken from '@/hooks/data-hooks/plaid/useGetPlaidAccessToken';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const { instance } = useMsal();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(logout(instance));

  const { data: ResponsePublicToken } = useGetPlaidPublicToken();

  const { mutate: accessToken } = useGetPlaidAccessToken();

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
