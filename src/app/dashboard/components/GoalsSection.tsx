import React from 'react';
import Section from './Section';
import DataSection from './DataSection';
import GoalCard from '@/app/goals/components/GoalCard';
import { useGoals } from '@/hooks/dashboard/use-goals';

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
  const { goals, isLoading } = useGoals();

  return (
    <>
      <Section title={title} className={`${className}`}>
        {scroll ? (
          <Section.Scrollable>
            <DataSection
              isLoading={isLoading}
              data={goals}
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
            isLoading={isLoading}
            data={goals}
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
