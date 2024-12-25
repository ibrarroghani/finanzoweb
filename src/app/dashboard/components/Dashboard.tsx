'use client';
import React from 'react';
import ClientDetailsCard from './ClientDetailsCard';
import BalanceCard from './BalanceCard';
import { balanceData, documentData } from '@/utils/dummy-data';
import DocumentCard from './DocumentCard';
import Chat from './Chat';
import Section from './Section';
import CustomAlert from './CustomAlert';
import AccountsSection from './AccountsSection';
import GoalsSection from './GoalsSection';

const Dashboard = () => {
  return (
    <div className='p-4'>
      <CustomAlert />
      <ClientDetailsCard />
      <div className='mt-6 flex gap-4'>
        <div className='w-[65%]'>
          {/* Balance Card */}
          <Section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {balanceData.map((balance) => (
              <Section.Item key={balance.id}>
                <BalanceCard balanceData={balance} />
              </Section.Item>
            ))}
          </Section>

          <div className='mt-2 flex flex-col gap-4 lg:flex-row'>
            {/* Linked Account */}
            <AccountsSection />

            {/* Goals */}
            <GoalsSection title='Goals' scroll={true} />
          </div>

          {/* Documents */}
          <Section title='Client Documents' className='mt-6'>
            {documentData.length > 0 &&
              documentData.map((document) => (
                <Section.Item key={document.id}>
                  <DocumentCard data={document} />
                </Section.Item>
              ))}
          </Section>
        </div>

        <div className='min-h-screen w-[35%]'>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
