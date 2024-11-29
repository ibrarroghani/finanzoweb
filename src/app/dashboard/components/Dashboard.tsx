'use client';
import React from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

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
        </>
      )}
    </div>
  );
};

export default Dashboard;
