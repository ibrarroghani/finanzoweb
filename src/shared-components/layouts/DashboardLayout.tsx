import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='bg-primary-light flex h-screen flex-col'>
      <Header />
      <main className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <div className='bg-content flex-1'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
