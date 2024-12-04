import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='flex h-screen flex-col bg-white px-6'>
      <Header />
      <main className='flex flex-1 gap-6 overflow-hidden'>
        <Sidebar />
        <div className='flex-1'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
