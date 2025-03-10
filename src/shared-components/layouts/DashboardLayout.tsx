'use client';
import React from 'react';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import { usePathname } from 'next/navigation';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const avoidRoute = [
    '/',
    '/login',
    '/test',
    '/sign-up',
    '/test-messaging',
    '/forget-password',
  ];
  const pathname = usePathname();
  return (
    <div className='flex h-screen flex-col bg-primary-light'>
      {!avoidRoute.includes(pathname) && <Header />}
      <main className='flex flex-1 overflow-hidden'>
        {!avoidRoute.includes(pathname) && <Sidebar />}
        <div className='flex-1 overflow-y-auto bg-content'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
