'use client';
import React, { useEffect, useState } from 'react';
import ClientDetailsCard from './ClientDetailsCard';
import BalanceCard from './BalanceCard';
import BankCard from './BankCard';

import {
  goalData,
  // bankData,
  balanceData,
  documentData,
} from '@/utils/dummy-data';

import DocumentCard from './DocumentCard';
import Chat from './Chat';
import Section from './Section';
import GoalCard from '@/app/goals/components/GoalCard';
import CustomAlert from './CustomAlert';
import useGetBankAccounts from '@/hooks/data-hooks/account/use-get-bank-accounts';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);

  const {
    data: AccountListResponse,
    //isLoading:AccountListLoading,
    //isError: AccountListError,
  } = useGetBankAccounts({ force_initial_plaid_account_fetch: 'no' });

  useEffect(() => {
    if (AccountListResponse && AccountListResponse.data) {
      console.log('accounts', AccountListResponse.data);
      setAccounts(AccountListResponse.data);
    }
  }, [AccountListResponse]);

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
            <Section title='Linked Accounts' className='lg:w-1/2'>
              <Section.Scrollable>
                {accounts.map((bank, index) => (
                  <Section.Item key={index}>
                    <BankCard bankData={bank} />
                  </Section.Item>
                ))}
              </Section.Scrollable>
            </Section>

            {/* Goals */}
            <Section title='Goals' className='lg:w-1/2'>
              <Section.Scrollable>
                {goalData.length > 0 &&
                  goalData.map((goal) => (
                    <Section.Item key={goal.id}>
                      <GoalCard goal={goal} />
                    </Section.Item>
                  ))}
              </Section.Scrollable>
            </Section>
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
