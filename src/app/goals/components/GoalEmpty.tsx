import {
  ClientAddIcon,
  NoGoalsIcon,
} from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import React from 'react';

interface IGoalEmpty {
  onClick: () => void;
}

const GoalEmpty: React.FC<IGoalEmpty> = ({ onClick }) => {
  return (
    <div className='mt-10 flex flex-col items-center gap-4'>
      <p className='flex h-12 w-12 items-center justify-center rounded-full bg-primary-light'>
        <NoGoalsIcon />
      </p>
      <p className='text-large font-semibold capitalize'>no goals created</p>
      <p className='text-14 font-light'>
        start by creating a goal to see personalized insights
      </p>
      <div className='w-52'>
        <CustomButton
          onClick={onClick}
          title='create new goal'
          icon={<ClientAddIcon />}
        />
      </div>
    </div>
  );
};

export default GoalEmpty;
