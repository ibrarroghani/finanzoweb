import { EditIcon } from '@/assets/icons/bussiness-panel-icons';
import React from 'react';
import CustomBadge from './CustomBadge';
import Image from 'next/image';

interface IGoalCardProps {
  title: string;
  edit?: boolean;
}

const GoalCard: React.FC<IGoalCardProps> = ({ edit, title }) => {
  return (
    <div className={`card flex flex-col ${edit ? '' : 'card-border'}`}>
      <div className='card-border-bottom flex items-center justify-between'>
        <p className='card-title text-large'>{title}</p>
        <div className='flex gap-3'>
          <CustomBadge text='Active' color='bg-success' />
          {edit && (
            <p className='cursor-pointer'>
              <EditIcon />
            </p>
          )}
        </div>
      </div>
      <div className='flex py-2'>
        <div className='w-1/2'>
          <p className='card-subtitle'>last payment</p>
          <p className='card-title text-large text-success'>$200</p>
          <p className='card-subtitle'>upcoming payment</p>
          <p className='card-title text-large text-primary-dark'>$200</p>
          <p className='card-subtitle'>Deadline</p>
          <p className='card-secondary-subtitle'>23 may, 2025</p>
        </div>
        <div className='reletive flex w-1/2 flex-col items-center justify-center'>
          <Image
            src='/images/Pie.png'
            alt='pie chart'
            height={100}
            width={100}
          />
          <p className='pt-1 text-15'>
            <span className='font-medium'>$450</span>
            <span>/$500</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
