import React from 'react';
import Section from './Section';
import BankCard from './BankCard';
import DataSection from './DataSection';
import { notification } from 'antd';
import useGetBankAccounts from '@/hooks/data-hooks/account/use-get-bank-accounts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const AccountsSection = () => {
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const { data, isLoading, isError, error } = useGetBankAccounts(slug, {
    force_initial_plaid_account_fetch: 'yes',
  });

  if (isError && error?.message) {
    notification.error({ message: error.message, placement: 'topRight' });
  }

  return (
    <>
      <Section title='Linked Accounts' className='lg:w-1/2'>
        <Section.Scrollable>
          <DataSection
            isLoading={isLoading}
            data={data?.data || []}
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
