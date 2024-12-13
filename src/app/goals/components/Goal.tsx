'use client';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import { ClientAddIcon } from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import React, { useState } from 'react';
import GoalModal from './GoalModal';
import GoalCard from '@/app/goals/components/GoalCard';
import RecommendationCard from './RecommendationCard';
import { goalData } from '@/utils/dummy-data';
import Section from '@/app/dashboard/components/Section';
import GoalEmpty from './GoalEmpty';

const Goal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const recommendations = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const handleCreateGoal = () => setShowModal(true);
  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className='p-4'>
      <ClientDetailsCard />
      {goalData.length > 0 ? (
        <>
          <Section className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {recommendations.length > 0 &&
              recommendations.map((recommendation) => (
                <Section.Item key={recommendation.id}>
                  <RecommendationCard key={recommendation.id} />
                </Section.Item>
              ))}
          </Section>
          <div className='mt-6 flex justify-between'>
            <p className='text-large font-semibold'>Goals</p>
            <div className='w-52'>
              <CustomButton
                onClick={handleCreateGoal}
                title='create new goal'
                icon={<ClientAddIcon />}
              />
            </div>
          </div>
          <Section className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {goalData.map((goal) => (
              <Section.Item key={goal.id}>
                <GoalCard key={goal.id} edit={true} goal={goal} />
              </Section.Item>
            ))}
          </Section>
        </>
      ) : (
        <GoalEmpty onClick={handleCreateGoal} />
      )}

      {showModal && (
        <div>
          <GoalModal
            showModal={showModal}
            setShowModal={handleToggleModal}
            title='Create New Goal'
          />
        </div>
      )}
    </div>
  );
};

export default Goal;
