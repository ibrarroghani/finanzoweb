import { useState, useEffect } from 'react';
import { notification } from 'antd';
import useGetGoals from '@/hooks/data-hooks/goal/use-get-goals';

export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const { data, isLoading, isError, error } = useGetGoals({
    force_initial_plaid_account_fetch: 'yes',
  });

  useEffect(() => {
    if (data?.data) {
      setGoals(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error?.message) {
      notification.error({ message: error.message, placement: 'topRight' });
    }
  }, [isError, error]);

  return { goals, isLoading };
};

export const useSingleGoal = () => {
  const [goal, setGoal] = useState(null);
  const { data, isLoading, isError, error } = useGetGoals({
    force_initial_plaid_account_fetch: 'yes',
  });

  useEffect(() => {
    if (data?.data) {
      setGoal(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError && error?.message) {
      notification.error({ message: error.message, placement: 'topRight' });
    }
  }, [isError, error]);

  return { goal, isLoading };
};
