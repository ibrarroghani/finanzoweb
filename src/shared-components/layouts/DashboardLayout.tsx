import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='flex h-screen flex-col bg-primary-light'>
      <Header />
      <main className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <div className='flex-1 overflow-y-auto bg-content'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
