'use client';
import React from 'react';
import useAuth from '@/hooks/auth/useAuth';

const Dashboard = () => {
  const { user, instance } = useAuth();

  const handleLogout = () => {
    instance.logoutRedirect();
    sessionStorage.clear();
    localStorage.clear();
  };

  return (
    <div className='items flex h-screen flex-col items-center justify-center'>
      <p>Welcome, {user?.name}</p>
      <p>Email: {user?.username}</p>
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
