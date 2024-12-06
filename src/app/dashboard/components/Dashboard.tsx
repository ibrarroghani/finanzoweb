'use client';
import React from 'react';
import ClientDetailsCard from './ClientDetailsCard';
import BalanceCard from './BalanceCard';
import BankCard from './BankCard';
import GoalCard from './GoalCard';

import DocumentCard from './DocumentCard';
import Chat from './Chat';

const Dashboard = () => {
  return (
    <div className='p-4'>
      <ClientDetailsCard
        name='client name'
        address='Lorem ipsum dolor, sit amet consectetur adipisicing elit.asperiore'
      />
      <div className='mt-6 flex gap-4'>
        <div className='w-[65%]'>
          <div className='flex gap-4'>
            <BalanceCard title='balance' amount='$12000' rate='12.5%' />
            <BalanceCard title='income' amount='$12000' rate='12.5%' />
            <BalanceCard title='expense' amount='$12000' rate='12.5%' />
          </div>
          <div className='mt-6 flex gap-4'>
            {/* Linked Account */}
            <div className='w-1/2 rounded-3 bg-primary-light px-2 py-4'>
              <div className='custom-scrollbar flex h-[500px] w-full flex-col gap-2 overflow-y-auto px-3'>
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
            </div>

            {/* Goals */}
            <div className='w-1/2 rounded-3 bg-primary-light px-2 py-4'>
              <div className='custom-scrollbar flex h-[500px] w-full flex-col gap-2 overflow-y-auto px-3'>
                <p>Goals</p>
                <GoalCard />
                <GoalCard />
                <GoalCard />
                <GoalCard />
              </div>
            </div>
          </div>
          <div className='mt-6 rounded-3 bg-primary-light p-2'>
            <p>Client Documents</p>
            <DocumentCard />
            <DocumentCard />
            <DocumentCard />
          </div>
        </div>

        <Chat />
      </div>
    </div>
  );
};

export default Dashboard;
