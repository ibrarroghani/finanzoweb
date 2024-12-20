import { EditIcon } from '@/assets/icons/bussiness-panel-icons';
import React from 'react';
import CustomBadge from '../../dashboard/components/CustomBadge';
import DoughnutChart from '@/shared-components/chart/DoughnutChart';
import { convertDateToString } from '@/utils/date-formatter';
import { Tooltip } from 'antd';
import { getChartColor } from '@/utils/color-picker';
import { useGoalPageContext } from '../context/GoalPageContext';

interface Igoal {
  progress_percentage: number;
  id: number;
  user_id: number;
  broker_id: number;
  linked_account_id: null;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  goal_status: string;
  target_date: Date;
  slug: string;
  created_at: Date;
  updated_at: Date;
}
interface IGoalCardProps {
  goal: Igoal;
  edit?: boolean;
}

const GoalCard: React.FC<IGoalCardProps> = ({ edit, goal }) => {
  const { showUpdateModal, setShowUpdateModal, setGoalSlug } =
    useGoalPageContext();
  const { title, goal_amount, goal_status, target_date, current_amount, slug } =
    goal;

  const handleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
    setGoalSlug(slug);
  };

  return (
    <div className={`card flex flex-col ${edit ? '' : 'card-border'}`}>
      <div className='card-border-bottom flex items-center justify-between'>
        <Tooltip title={title}>
          <p className='card-title text-large truncate'>{title}</p>
        </Tooltip>

        <div className='flex gap-3'>
          <CustomBadge
            text={goal_status}
            color={
              goal_status.toLowerCase() === 'active'
                ? 'bg-success'
                : 'bg-card text-[#989898]'
            }
          />
          {edit && (
            <p className='cursor-pointer' onClick={handleUpdateModal}>
              <EditIcon />
            </p>
          )}
        </div>
      </div>
      <div className='-mr-2 flex py-2'>
        <div className='w-1/2'>
          <p className='card-subtitle'>last payment</p>
          <p className='card-title text-large text-success'>$0</p>
          <p className='card-subtitle'>upcoming payment</p>
          <p className='card-title text-large text-primary-dark'>$0</p>
          <p className='card-subtitle'>Deadline</p>
          <p className='card-secondary-subtitle'>
            {convertDateToString(target_date)}
          </p>
        </div>
        <div className='flex w-1/2 flex-col justify-end'>
          <div className='flex justify-end'>
            <DoughnutChart
              data={[80, 20]}
              backgroundColor={getChartColor(goal_status)}
            />
          </div>

          <p className='text-medium mr-8 flex justify-end pt-1'>
            <span className='font-medium'>${current_amount}</span>
            <span>/${goal_amount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
