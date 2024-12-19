import React from 'react';
import Section from './Section';
import { useAccounts } from '@/hooks/dashboard/use-accounts';
import DataSection from './DataSection';
import GoalCard from '@/app/goals/components/GoalCard';

const GoalsSection = () => {
  const { accounts, isLoading } = useAccounts();

  return (
    <>
      <Section title='Linked Accounts' className='lg:w-1/2'>
        <Section.Scrollable>
          <DataSection
            isLoading={isLoading}
            data={accounts}
            //eslint-disable-next-line
            renderItem={(goal: any, index: any) => (
              <Section.Item key={index}>
                <GoalCard goal={goal} />
              </Section.Item>
            )}
            emptyMessage='No Goal is available.'
          />
        </Section.Scrollable>
      </Section>
    </>
  );
};

export default GoalsSection;
