import React, { useEffect } from 'react';
import Section from './Section';
import BankCard from './BankCard';
import DataSection from './DataSection';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useGetBankInstitutions from '@/hooks/data-hooks/account/use-get-bank-institutions';
import { IInstitutions } from '../interface/account-interface';
import { BankIcon } from '@/assets/icons/bussiness-panel-icons';
interface AccountsSectionProps {
  className?: string;
  showDetails?: boolean;
}

const AccountsSection: React.FC<AccountsSectionProps> = ({
  className = 'lg:w-1/2',
  showDetails = false,
}) => {
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const { data, isLoading, isError, error } = useGetBankInstitutions(slug, {
    force_initial_plaid_account_fetch: 'no',
  });

  useEffect(() => {
    if (isError && error?.message) {
      notification.error({ message: error.message, placement: 'topRight' });
    }
  }, [isError, error]);

  return (
    <>
      <Section
        icon={showDetails ? <BankIcon /> : null}
        available={showDetails ? data?.data.length : undefined}
        title='Bank'
        className={className}
      >
        <Section.Scrollable>
          <DataSection
            isLoading={isLoading}
            data={data?.data || []}
            renderItem={(bank: IInstitutions, index: number) => (
              <Section.Item key={index}>
                <BankCard bankData={bank} />
              </Section.Item>
            )}
            emptyMessage='No bank accounts available.'
          />
        </Section.Scrollable>
      </Section>
    </>
  );
};

export default AccountsSection;
