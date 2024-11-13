'use client';
import React from 'react';
import { useMyAuth } from '@/providers/MyAuthProvider'; // Ensure the path is correct

const Dashboard = () => {
  const { user, logout, isAuthenticated, loading } = useMyAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  const handleLogout = () => {
    logout();
  };

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
