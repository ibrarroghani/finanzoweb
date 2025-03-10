'use client';
import React, { Fragment } from 'react';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import AccountsSection from '@/app/dashboard/components/AccountsSection';
import useGetGroupAccounts from '@/hooks/data-hooks/account/use-get-group-accounts';
import Section from '@/app/dashboard/components/Section';
import DataSection from '@/app/dashboard/components/DataSection';
import FinancialCard from './FinancialCard';
import {
  CardIcon,
  DepositoryIcon,
  InvestmentIcon,
  LoanIcon,
  MortgageIcon,
  OtherIcon,
} from '@/assets/icons/bussiness-panel-icons';

const getIconByGroupName = (groupName: string) => {
  switch (groupName) {
    case 'Credit':
      return <CardIcon />;
    case 'Loan':
      return <LoanIcon />;
    case 'Mortgage':
      return <MortgageIcon />;
    case 'Depository':
      return <DepositoryIcon />;
    case 'Investment':
      return <InvestmentIcon />;
    case 'Other':
      return <OtherIcon />;
    default:
      return null;
  }
};

const FinancialOverview = () => {
  const { client, loading } = useSelector((state: RootState) => state.auth);
  const { data: groupAccounts, isLoading: accountsLoading } =
    useGetGroupAccounts(client?.slug, {
      force_initial_plaid_account_fetch: 'yes',
    });

  const isLoading = accountsLoading || loading;

  return (
    <div className='flex h-full flex-grow flex-col p-4'>
      <ClientDetailsCard data={client} isLoading={isLoading} />

      {groupAccounts?.data.length > 0 ? (
        <div className='mt-4 flex gap-4 overflow-hidden overflow-x-auto'>
          {!isLoading && (
            <AccountsSection
              showDetails={true}
              className='h-full min-w-[300px]'
            />
          )}

          {groupAccounts?.data.map(
            //eslint-disable-next-line
            (superGroup: any) =>
              superGroup.groups.length > 0 && (
                <Fragment key={superGroup.super_group_key}>
                  <Section
                    title={superGroup.super_group_name}
                    icon={getIconByGroupName(superGroup.super_group_name)}
                    className='min-w-[300px] flex-grow pb-5'
                    available={`${superGroup.groups[0].accounts.length}`}
                  >
                    <Section.Scrollable>
                      <DataSection
                        isLoading={isLoading}
                        data={superGroup?.groups[0].accounts || []}
                        //eslint-disable-next-line
                        renderItem={(data: any, index: number) => (
                          <Section.Item key={index}>
                            <FinancialCard data={data} />
                          </Section.Item>
                        )}
                        emptyMessage='No linked accounts available.'
                      />
                    </Section.Scrollable>
                  </Section>
                </Fragment>
              )
          )}
        </div>
      ) : (
        <div className='mt-24 flex h-full items-center justify-center'>
          {!isLoading && (
            <p className='text-large'>No linked accounts available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialOverview;
