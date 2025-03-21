import React from 'react';
import Section from './Section';
import DataSection from './DataSection';
import GoalCard from '@/app/goals/components/GoalCard';
import useGetGoals from '@/hooks/data-hooks/goal/use-get-goals';
import { notification } from 'antd';
import { useIsFetching } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IGoal } from '@/app/goals/interface/goal-interface';

interface IGoalsSectionProps {
  scroll?: boolean;
  title?: string;
  edit?: boolean;
  className?: string;
}

const GoalsSection: React.FC<IGoalsSectionProps> = ({
  scroll = false,
  title,
  edit = false,
  className = 'lg:w-1/2',
}) => {
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const { data, isLoading, isError, error } = useGetGoals(slug, {
    force_initial_plaid_account_fetch: 'yes',
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
          <Section.Scrollable height='440px'>
            <DataSection
              isLoading={isLoadingState}
              data={data?.data || []}
              renderItem={(goal: IGoal, index: number) => (
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
            renderItem={(goal: IGoal, index: number) => (
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
