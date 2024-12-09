'use client';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import {
  ClientAddIcon,
  NoGoalsIcon,
} from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import React, { useState } from 'react';
import GoalModal from './GoalModal';

const Goal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const goals = [];

  const handleCreateGoal = () => setShowModal(true);
  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className='p-4'>
      <ClientDetailsCard />
      {goals.length > 0 ? (
        <div></div>
      ) : (
        <div className='mt-10 flex flex-col items-center gap-4'>
          <p className='flex h-12 w-12 items-center justify-center rounded-full bg-primary-light'>
            <NoGoalsIcon />
          </p>
          <p className='text-18 font-semibold capitalize'> no goals created</p>
          <p className='text-14 font-light'>
            start by creating a goal to see personalized insights
          </p>
          <div className=''>
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
