import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { ISingleGoal } from '../interface/goal-interface';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useGetGoalChart from '@/hooks/data-hooks/goal/use-get-goal-chart';
import { format } from 'date-fns';
import LineChart from '@/shared-components/chart/LineChart';
import useGetSingleGoal from '@/hooks/data-hooks/goal/use-get-single-goal';
import Spinner from '@/shared-components/Spinner';
import { convertDateToString } from '@/utils/date-formatter';
import CustomButton from '@/shared-components/CustomButton';
import UpdateGoalModal from './UpdateGoalModal';

/* eslint-disable no-unused-vars */
enum GoalProgressEstimatedDateStatus {
  AHEAD = 'ahead',
  BEHIND = 'behind',
  UNKNOWN = 'unknown',
  NEVER = 'never',
  ON_TIME = 'on_time',
}
/* eslint-enable no-unused-vars */

interface IGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
  goalSlug: string;
}

interface IGoalChartData {
  id: number;
  label: string;
  value: string;
}

const formatDateLabel = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd MMM yy');
};

const estimatedGoal = (
  status: GoalProgressEstimatedDateStatus,
  difference: string,
  estimatedDate: Date
) => {
  switch (status) {
    case GoalProgressEstimatedDateStatus.AHEAD:
      return `Ahead (${difference}): ${format(estimatedDate, 'd MMM, yyyy')}`;
    case GoalProgressEstimatedDateStatus.BEHIND:
      return `Behind (${difference}): ${format(estimatedDate, 'd MMM, yyyy')}`;
    case GoalProgressEstimatedDateStatus.ON_TIME:
      return `On Time: ${format(estimatedDate, 'd MMM, yyyy')}`;
    case GoalProgressEstimatedDateStatus.UNKNOWN:
      return 'Unknown';

    case GoalProgressEstimatedDateStatus.NEVER:
      return 'Never';
    default:
      return 'Unknown';
  }
};

const GoalDetailsModal = ({
  title,
  showModal,
  setShowModal,
  goalSlug,
}: IGoalModalProps) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [goal, setGoal] = useState<ISingleGoal | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const clientSLug = useSelector((state: RootState) => state.auth.client.slug);
  const { mutate: getGoalChart } = useGetGoalChart(clientSLug, goalSlug);

  const { data: goalData, isLoading: isGoalLoading } = useGetSingleGoal(
    clientSLug,
    goalSlug
  );

  useEffect(() => {
    if (goalData && goalData?.data) {
      setGoal(goalData.data?.goal);
    }
  }, [goalData]);

  useEffect(() => {
    getGoalChart(
      {
        dataPoint: 4,
      },
      {
        onSuccess: (response) => {
          if (response.data.length > 0) {
            const newLabels = response.data.map((item: IGoalChartData) =>
              formatDateLabel(item.label)
            );
            const newValues = response.data.map((item: IGoalChartData) =>
              Number(item.value)
            );

            setLabels(newLabels);
            setValues(newValues);
          }
        },
      }
    );
  }, [getGoalChart]);

  const handleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <div className='custom-scrollbar flex h-[500px] flex-col overflow-y-auto pr-4'>
          {isGoalLoading ? (
            <div className='flex flex-1 items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <>
              <div className='w-full'>
                <p className='card-subtitle'>Goal Description</p>
                <p className='card-secondary-subtitle'>{goal?.description}</p>

                <div className='flex'>
                  <div className='w-1/2'>
                    <p className='card-subtitle'>savings amount</p>
                    <p className='card-title text-large text-success'>
                      ${goal?.goal_amount}
                    </p>
                  </div>
                  <div className='w-1/2'>
                    <p className='card-subtitle'>Target Date</p>
                    <p className='card-secondary-subtitle'>
                      {goal?.target_date
                        ? convertDateToString(goal?.target_date)
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-1/2'>
                    <p className='card-subtitle'>Current Savings</p>
                    <p className='card-title text-large text-primary-dark'>
                      {goal?.current_amount}
                    </p>
                  </div>
                  <div className='w-1/2'>
                    <p className='card-subtitle'>
                      Estimated Monthly Contribution
                    </p>
                    <p className='card-title text-large text-primary-dark'>
                      ${goal?.estimated_contributions?.monthly.toFixed(2) ?? 0}
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div className='w-1/2'>
                    <p className='card-subtitle'>goal status</p>
                    <p className='card-secondary-subtitle text-medium text-primary-dark'>
                      {goal?.goal_status}
                    </p>
                  </div>
                  <div className='w-1/2'>
                    <p className='card-subtitle'>goal purpose</p>
                    <p className='card-secondary-subtitle text-medium text-primary-dark'>
                      {goal?.goal_purpose}
                    </p>
                  </div>
                </div>

                <div className='flex'>
                  <div>
                    <p className='card-subtitle'>
                      Estimated Date of Completion
                    </p>
                    <p className='card-secondary-subtitle text-medium text-primary-dark'>
                      {estimatedGoal(
                        (goal?.estimated_date_progress
                          ?.status as GoalProgressEstimatedDateStatus) ||
                          GoalProgressEstimatedDateStatus.UNKNOWN,
                        goal?.estimated_date_progress?.difference || '0',
                        goal?.estimated_date_progress?.estimated_target_date ||
                          new Date()
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='card-subtitle'>Selected Accounts</h3>
                {goal?.goalAccounts.map((account) => (
                  <div
                    key={account.id}
                    className='card mb-2 flex-col items-center justify-between rounded-lg border shadow'
                  >
                    <p className='font-medium'>{account.account.name}</p>
                    <div className='flex justify-between'>
                      <div className='flex flex-col'>
                        <p className='card-subtitle'>Type</p>
                        <p className='card-title'>
                          {account.account.type} ({account.account.subtype})
                        </p>
                      </div>
                      <div className='flex flex-col'>
                        <p className='card-subtitle'>Contribution Limit</p>
                        <p className='card-title'>
                          ${account.contribution_limit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-4'>
                <p className='card-subtitle'>Goal Progress</p>
                <LineChart labels={labels} data={values} />
              </div>

              <div className='my-4'>
                <CustomButton title='Edit Goal' onClick={handleUpdateModal} />
              </div>
            </>
          )}
        </div>
      </Modal>

      {showUpdateModal && (
        <UpdateGoalModal
          title='Update Goal'
          showModal={showUpdateModal}
          setShowModal={handleUpdateModal}
          goalSlug={goalSlug}
        />
      )}
    </>
  );
};

export default GoalDetailsModal;
