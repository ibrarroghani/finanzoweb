import React from 'react';
import Dashboard from '@/app/admin/dashboard/components/Dashboard';
import Auth from '@/shared-components/auth/Auth';

const page = () => {
  return (
    <Auth>
      <Dashboard />
    </Auth>
  );
};

export default page;
