'use client';
import React from 'react';
import ClientDetailsCard from './ClientDetailsCard';
import BalanceCard from './BalanceCard';
import BankCard from './BankCard';
import GoalCard from './GoalCard';

const Dashboard = () => {
  return (
    <div className='p-4'>
      <ClientDetailsCard
        name='client name'
        address='Lorem ipsum dolor, sit amet consectetur adipisicing elit.asperiore'
      />
      <div className='flex gap-2'>
        <div className='w-[70%]'>
          <div className='flex gap-2'>
            <BalanceCard title='balance' amount='$12000' rate='12.5%' />
            <BalanceCard title='income' amount='$12000' rate='12.5%' />
            <BalanceCard title='expense' amount='$12000' rate='12.5%' />
          </div>
          <div className='mt-2 flex gap-2'>
            <div className='custom-scrollbar flex h-[500px] w-1/2 flex-col gap-2 overflow-y-auto rounded-3 bg-primary-light p-3'>
              <p>Linked Account</p>
              <BankCard
                title='bank name'
                account='1234567890'
                card='123433332'
              />
              <BankCard
                title='bank name'
                account='1234567890'
                card='123433332'
              />
              <BankCard
                title='bank name'
                account='1234567890'
                card='123433332'
              />
              <BankCard
                title='bank name'
                account='1234567890'
                card='123433332'
              />
            </div>
            <div className='custom-scrollbar flex h-[500px] w-1/2 flex-col gap-2 overflow-y-auto rounded-3 bg-primary-light p-3'>
              <p>Goals</p>
              <GoalCard />
              <GoalCard />
              <GoalCard />
              <GoalCard />
            </div>
          </div>
        </div>
        <div className='w-[30%]'></div>
      </div>
    </div>
  );
};

export default Dashboard;
