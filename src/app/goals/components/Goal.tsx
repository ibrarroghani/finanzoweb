'use client';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import { ClientAddIcon } from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import React, { useState } from 'react';
import CreateGoalModal from './CreateGoalModal';
import GoalEmpty from './GoalEmpty';
import GoalsSection from '@/app/dashboard/components/GoalsSection';
import useGetGoals from '@/hooks/data-hooks/goal/use-get-goals';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Spinner from '@/shared-components/Spinner';

const Goal = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { client, loading } = useSelector((state: RootState) => state.auth);

  const { data, isLoading } = useGetGoals(client.slug, {
    force_initial_plaid_account_fetch: 'yes',
  });

  const handleCreateGoal = () => setShowCreateModal(!showCreateModal);

  if (isLoading)
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  return (
    <div className='p-4'>
      <ClientDetailsCard data={client} isLoading={loading} />
      {data?.data.length > 0 ? (
        <>
          <div className='mt-6 flex justify-between'>
            <p className='text-large font-semibold'>Goals</p>
            <div className='w-52'>
              <CustomButton
                onClick={handleCreateGoal}
                title='create new goal'
                icon={<ClientAddIcon />}
                className='btn-gradient'
              />
            </div>
          </div>

          <GoalsSection
            className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
            edit={true}
          />
        </>
      ) : (
        <GoalEmpty onClick={handleCreateGoal} />
      )}

      {showCreateModal && (
        <div>
          <CreateGoalModal
            showModal={showCreateModal}
            setShowModal={handleCreateGoal}
            title='Create New Goal'
          />
        </div>
      )}
    </div>
  );
};

export default Goal;
