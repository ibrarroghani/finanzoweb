import React from 'react';
import Section from './Section';
import DataSection from './DataSection';
import GoalCard from '@/app/goals/components/GoalCard';
import useGetGoals from '@/hooks/data-hooks/goal/use-get-goals';
import { notification } from 'antd';
import { useIsFetching } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface IGoalsSection {
  scroll?: boolean;
  title?: string;
  edit?: boolean;
  className?: string;
}

const GoalsSection: React.FC<IGoalsSection> = ({
  scroll = false,
  title,
  edit = false,
  className = 'lg:w-1/2',
}) => {
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const { data, isLoading, isError, error } = useGetGoals(slug, {
    force_initial_plaid_account_fetch: 'no',
  });

  const isFetching = useIsFetching({ queryKey: ['getGoals'] });

  if (isError && error?.message) {
    notification.error({ message: error.message, placement: 'topRight' });
  }

  const isLoadingState = isLoading || isFetching > 0;

  return (
    <>
      <Section title={title} className={`${className}`}>
        {scroll ? (
          <Section.Scrollable>
            <DataSection
              isLoading={isLoadingState}
              data={data?.data || []}
              //eslint-disable-next-line
              renderItem={(goal: any, index: any) => (
                <Section.Item key={index}>
                  <GoalCard edit={edit} goal={goal} />
                </Section.Item>
              )}
              emptyMessage='No Goal is available.'
            />
          </Section.Scrollable>
        ) : (
          <DataSection
            isLoading={isLoadingState}
            data={data?.data || []}
            //eslint-disable-next-line
            renderItem={(goal: any, index: any) => (
              <Section.Item key={index}>
                <GoalCard edit={edit} goal={goal} />
              </Section.Item>
            )}
          />
        )}
      </Section>
    </>
  );
};

export default GoalsSection;
