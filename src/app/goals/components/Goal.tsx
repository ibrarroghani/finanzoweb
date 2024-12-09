'use client';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import {
  ClientAddIcon,
  NoGoalsIcon,
} from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import React, { useState } from 'react';
import GoalModal from './GoalModal';
import GoalCard from '@/app/dashboard/components/GoalCard';
import RecommendationCard from './RecommendationCard';

const Goal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const goals = [
    { id: 1, title: 'SIP Goal 1' },
    { id: 2, title: 'SIP Goal 2' },
    { id: 3, title: 'SIP Goal 3' },
    { id: 4, title: 'SIP Goal 4' },
    { id: 5, title: 'SIP Goal 5' },
  ];

  const recommendations = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const handleCreateGoal = () => setShowModal(true);
  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className='p-4'>
      <ClientDetailsCard />
      {goals.length > 0 ? (
        <>
          <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {recommendations.length > 0 &&
              recommendations.map((recommendation) => (
                <RecommendationCard key={recommendation.id} />
              ))}
          </div>
          <div className='mt-6 flex justify-between'>
            <p className='text-18 font-semibold'>Goals</p>
            <div className='w-52'>
              <CustomButton
                onClick={handleCreateGoal}
                title='create new goal'
                icon={<ClientAddIcon />}
              />
            </div>
          </div>
          <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {goals.map((goal) => (
              <GoalCard key={goal.id} edit={true} title={goal.title} />
            ))}
          </div>
        </>
      ) : (
        <div className='mt-10 flex flex-col items-center gap-4'>
          <p className='flex h-12 w-12 items-center justify-center rounded-full bg-primary-light'>
            <NoGoalsIcon />
          </p>
          <p className='text-18 font-semibold capitalize'> no goals created</p>
          <p className='text-14 font-light'>
            start by creating a goal to see personalized insights
          </p>
          <div className='w-52'>
            <CustomButton
              onClick={handleCreateGoal}
              title='create new goal'
              icon={<ClientAddIcon />}
            />
          </div>
        </div>
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
