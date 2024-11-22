'use client';
import React from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/auth-slice';
import { useMsal } from '@azure/msal-react';
import PlaidTokenExchange from './PlaidTokenExchange'; // Import the Plaid token exchange component

const Dashboard = () => {
  const { instance } = useMsal();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(logout(instance));

  return (
    <div className='items flex h-screen flex-col items-center justify-center'>
      {!isAuthenticated && <p>You are not authenticated. Please log in.</p>}

      {isAuthenticated && (
        <>
          <p>Welcome, {user?.name}</p>
          <p>Email: {user?.email}</p>

          {/* Plaid Token Exchange Component */}
          <div className='py-10'>
            <PlaidTokenExchange />
          </div>

          <button
            className='rounded-md bg-green-400 p-2 text-white'
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
