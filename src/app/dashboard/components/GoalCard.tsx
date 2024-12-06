import { DonutIcon } from '@/assets/icons/bussiness-panel-icons';
import React from 'react';

const GoalCard = () => {
  return (
    <div className='flex rounded-5 border border-border-primary bg-primary-light'>
      <div className='w-1/2 px-4'>
        <p className='mt-2 border-b border-border-primary text-18 font-bold text-primary-dark'>
          SIP Goal
        </p>
        <p className='my-2 text-12 capitalize'>last payment</p>
        <p className='text-[20px] font-bold text-success'>$200</p>
        <p className='my-2 text-12 capitalize'>upcoming payment</p>
        <p className='text-18 font-bold text-primary-dark'>$200</p>
      </div>
      <div className='flex w-1/2 items-center pt-8'>
        <DonutIcon />
      </div>
    </div>
  );
};

export default GoalCard;
