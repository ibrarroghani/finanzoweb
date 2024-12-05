'use client';
import React from 'react';
import ClientDetailsCard from './ClientDetailsCard';
import BalanceCard from './BalanceCard';

const Dashboard = () => {
  return (
    <div className='p-4'>
      <ClientDetailsCard
        name='client name'
        address='Lorem ipsum dolor, sit amet consectetur adipisicing elit.asperiores liy'
      />

      <BalanceCard title='balance' amount='$12000' rate='12.5%' />
    </div>
  );
};

export default Dashboard;
