'use client';
import React from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/AuthSlice';
import { useMsal } from '@azure/msal-react';

const Dashboard = () => {
  const { instance } = useMsal();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => dispatch(logout(instance));

  return (
    <div className='items flex h-screen flex-col items-center justify-center'>
      <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>
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
