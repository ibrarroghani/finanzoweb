import { useState, useEffect } from 'react';
import { notification } from 'antd';
import useGetBankAccounts from '@/hooks/data-hooks/account/use-get-bank-accounts';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { data, isLoading, isError, error } = useGetBankAccounts({
    force_initial_plaid_account_fetch: 'yes',
  });

  useEffect(() => {
    if (data?.data) {
      setAccounts(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error?.message) {
      notification.error({ message: error.message, placement: 'topRight' });
    }
  }, [isError, error]);

  return { accounts, isLoading };
};
