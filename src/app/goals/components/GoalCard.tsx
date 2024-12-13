import { EditIcon } from '@/assets/icons/bussiness-panel-icons';
import React from 'react';
import CustomBadge from '../../dashboard/components/CustomBadge';
import DoughnutChart from '@/shared-components/chart/DoughnutChart';

interface Igoal {
  id: number;
  title: string;
  status: string;
  targetAmount: string;
  totalPaidAmount: string;
  lastPaidAmount: string;
  deadline: string;
}
interface IGoalCardProps {
  goal: Igoal;
  edit?: boolean;
}

const GoalCard: React.FC<IGoalCardProps> = ({ edit, goal }) => {
  const {
    title,
    status,
    targetAmount,
    totalPaidAmount,
    lastPaidAmount,
    deadline,
  } = goal;

  return (
    <div className={`card flex flex-col ${edit ? '' : 'card-border'}`}>
      <div className='card-border-bottom flex items-center justify-between'>
        <p className='card-title text-large'>{title}</p>
        <div className='flex gap-3'>
          <CustomBadge text={status} color='bg-success' />
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
          <p className='card-title text-large text-success'>{lastPaidAmount}</p>
          <p className='card-subtitle'>upcoming payment</p>
          <p className='card-title text-large text-primary-dark'>
            {lastPaidAmount}
          </p>
          <p className='card-subtitle'>Deadline</p>
          <p className='card-secondary-subtitle'>{deadline}</p>
        </div>
        <div className='reletive flex w-1/2 flex-col items-center justify-center'>
          <DoughnutChart
            data={[80, 20]}
            backgroundColor={['#3fa75a', '#34A8531A']}
          />
          <p className='text-medium pt-1'>
            <span className='font-medium'>{totalPaidAmount}</span>
            <span>/{targetAmount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
