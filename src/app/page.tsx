'use client';
import React from 'react';
import UnProtectedRoute from '@/shared-components/auth/UnProtectedRoute';
import Login from '@/app/login/components/Login';

const Home = () => {
  return (
    <UnProtectedRoute>
      <Login />
    </UnProtectedRoute>
  );
};

export default Home;
