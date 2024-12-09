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
    <div
      className={`flex flex-col rounded-5 bg-primary-light px-4 ${edit ? '' : 'border border-border-primary'}`}
    >
      <div className='flex items-center justify-between border-b border-border-primary py-2'>
        <p className='text-18 font-bold text-primary-dark'>{title}</p>
        <div className='flex gap-3'>
          <p>
            <CustomBadge text='Active' color='bg-success' />
          </p>
          {edit && (
            <p className='cursor-pointer'>
              <EditIcon />
            </p>
          )}
        </div>
      </div>
      <div className='flex py-2'>
        <div className='w-1/2'>
          <p className='my-1 text-12 capitalize'>last payment</p>
          <p className='my-1 text-18 font-bold text-success'>$200</p>
          <p className='my-1 text-12 capitalize'>upcoming payment</p>
          <p className='my-1 text-18 font-bold text-primary-dark'>$200</p>
          <p className='my-1 text-12 capitalize'>Deadline</p>
          <p className='my-1 text-15 font-semibold capitalize'>23 may, 2025</p>
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
