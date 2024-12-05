'use client';
import React from 'react';
import ClientDetailsCard from './ClientDetailsCard';
import BalanceCard from './BalanceCard';
import BankCard from './BankCard';
import GoalCard from './GoalCard';
import {
  ImageUploadIcon,
  MessageSendIcon,
} from '@/assets/icons/bussiness-panel-icons';

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
        <div className='mt-2 flex h-[500px] w-[30%] flex-col rounded-3 bg-primary-light'>
          {/* Chat Messages Section */}
          <div className='custom-scrollbar overflow-y-auto p-4'>
            {/* Message (Left) */}
            <div className='mb-4 flex items-start'>
              <div className='max-w-[80%] self-start rounded-lg bg-content p-4'>
                <p className='text-12'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
                <p className='mt-2 text-10 text-gray-500'>6:00, 8/11/2024</p>
              </div>
            </div>

            <div className='mb-4 flex items-start'>
              <div className='max-w-[80%] self-start rounded-lg bg-content p-4'>
                <p className='text-12'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
                <p className='mt-2 text-10 text-gray-500'>6:00, 8/11/2024</p>
              </div>
            </div>

            <div className='mb-4 flex items-start'>
              <div className='max-w-[80%] self-start rounded-lg bg-content p-4'>
                <p className='text-12'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
                <p className='mt-2 text-10 text-gray-500'>6:00, 8/11/2024</p>
              </div>
            </div>

            <div className='mb-4 flex items-start'>
              <div className='max-w-[80%] self-start rounded-lg bg-content p-4'>
                <p className='text-12'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
                <p className='mt-2 text-10 text-gray-500'>6:00, 8/11/2024</p>
              </div>
            </div>

            <div className='mb-4 flex items-start'>
              <div className='max-w-[80%] self-start rounded-lg bg-content p-4'>
                <p className='text-12'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
                <p className='mt-2 text-10 text-gray-500'>6:00, 8/11/2024</p>
              </div>
            </div>

            {/* Message (Right) */}
            <div className='mb-4 flex items-end justify-end'>
              <div className='max-w-[80%] self-end rounded-lg bg-content p-4'>
                <p className='text-12'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the.
                </p>
                <p className='mt-2 text-10 text-gray-500'>6:00, 8/11/2024</p>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className='p-4'>
            <div className='relative flex w-full items-center'>
              {/* Input Field */}
              <input
                type='text'
                placeholder='Enter Your Message'
                className='w-full max-w-full rounded-3 border border-border-primary p-4 pr-16 text-sm focus:outline-none'
              />

              {/* Send Icon */}
              <button className='absolute right-12 top-1/2 flex h-8 w-8 shrink-0 -translate-y-1/2 items-center justify-center'>
                <MessageSendIcon />
              </button>

              {/* Upload Icon */}
              <button className='absolute right-2 top-1/2 flex h-8 w-8 shrink-0 -translate-y-1/2 items-center justify-center'>
                <ImageUploadIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
