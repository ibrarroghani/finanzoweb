import React, { useState } from 'react';
import CustomBadge from '../../dashboard/components/CustomBadge';
import DoughnutChart from '@/shared-components/chart/DoughnutChart';
import { convertDateToString } from '@/utils/date-formatter';
import { Tooltip } from 'antd';
import { getChartColor } from '@/utils/color-picker';
import { IGoal } from '../interface/goal-interface';
import CustomButton from '@/shared-components/CustomButton';
import GoalDetailsModal from './GoalDetailsModal';
interface IGoalCardProps {
  goal: IGoal;
  edit?: boolean;
}

const GoalCard: React.FC<IGoalCardProps> = ({ edit, goal }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const {
    title,
    goal_amount,
    goal_status,
    target_date,
    current_amount,
    slug,
    progress_percentage,
    estimated_contributions,
  } = goal;

  return (
    <>
      <div className={`card flex flex-col ${edit ? '' : 'card-border'}`}>
        <div className='card-border-bottom flex items-center justify-between'>
          <Tooltip title={title}>
            <p className='card-title text-large truncate'>{title}</p>
          </Tooltip>

          <div className='ml-1 flex gap-3'>
            <CustomBadge
              text={goal_status}
              color={
                goal_status.toLowerCase() === 'active' ||
                goal_status.toLowerCase() === 'completed'
                  ? 'bg-success'
                  : 'bg-muted'
              }
            />
          </div>
        </div>
        <div className='-mr-2 flex py-2'>
          <div className='w-1/2'>
            <>
              <p className='card-subtitle'>Target Amount</p>
              <p className='card-title text-large text-success'>
                ${goal_amount}
              </p>
              <p className='card-subtitle'>Monthly Contribution</p>
              <p className='card-title text-large text-primary-dark'>
                ${estimated_contributions?.monthly.toFixed(2) ?? 0}
              </p>
              <p className='card-subtitle'>Target Date</p>
              <p className='card-secondary-subtitle'>
                {convertDateToString(target_date)}
              </p>
            </>
          </div>
          <div className='flex w-1/2 flex-col items-center justify-end'>
            <div className='flex justify-center'>
              <DoughnutChart
                data={[
                  Math.min(progress_percentage, 100),
                  Math.max(0, 100 - progress_percentage),
                ]}
                backgroundColor={getChartColor(goal_status)}
              />
            </div>

            {edit && (
              <p className='text-medium flex justify-center pt-1'>
                <span className='font-medium'>${current_amount}</span>
                <span>/${goal_amount}</span>
              </p>
            )}
          </div>
        </div>

        <CustomButton
          title='Goal Details'
          onClick={() => setShowDetailsModal(!showDetailsModal)}
        />
      </div>

      {showDetailsModal && (
        <GoalDetailsModal
          showModal={showDetailsModal}
          setShowModal={() => setShowDetailsModal(!showDetailsModal)}
          title={title}
          goalSlug={slug}
        />
      )}
    </>
  );
};

export default GoalCard;
