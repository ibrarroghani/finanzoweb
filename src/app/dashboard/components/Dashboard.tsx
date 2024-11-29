'use client';
import React from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

import PlaidTokenExchange from './PlaidTokenExchange';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div className='items flex flex-col items-center justify-center'>
      {!isAuthenticated && <p>You are not authenticated. Please log in.</p>}
      {isAuthenticated && (
        <>
          <p>Welcome, {user?.name}</p>
          <p>Email: {user?.email}</p>

          {/* Plaid Token Exchange Component */}
          <div className='py-10'>
            <PlaidTokenExchange />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
