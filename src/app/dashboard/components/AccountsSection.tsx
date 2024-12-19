import React from 'react';
import Section from './Section';
import { useAccounts } from '@/hooks/dashboard/use-accounts';
import BankCard from './BankCard';
import DataSection from './DataSection';

const AccountsSection = () => {
  const { accounts, isLoading } = useAccounts();

  return (
    <>
      <Section title='Linked Accounts' className='lg:w-1/2'>
        <Section.Scrollable>
          <DataSection
            isLoading={isLoading}
            data={accounts}
            //eslint-disable-next-line
            renderItem={(bank: any, index: any) => (
              <Section.Item key={index}>
                <BankCard bankData={bank} />
              </Section.Item>
            )}
            emptyMessage='No linked accounts available.'
          />
        </Section.Scrollable>
      </Section>
    </>
  );
};

export default AccountsSection;
