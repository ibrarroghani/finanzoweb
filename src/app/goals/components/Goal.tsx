'use client';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import { ClientAddIcon } from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import React from 'react';
import CreateGoalModal from './CreateGoalModal';
import RecommendationCard from './RecommendationCard';
import { recommendationData } from '@/utils/dummy-data';
import Section from '@/app/dashboard/components/Section';
import GoalEmpty from './GoalEmpty';
import GoalsSection from '@/app/dashboard/components/GoalsSection';
import { useGoalPageContext } from '../context/GoalPageContext';
import UpdateGoalModal from './UpdateGoalModal';
import useGetGoals from '@/hooks/data-hooks/goal/use-get-goals';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Spinner from '@/shared-components/Spinner';

const Goal = () => {
  const {
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
  } = useGoalPageContext();

  const { client, loading } = useSelector((state: RootState) => state.auth);

  const { data, isLoading } = useGetGoals(client.slug, {
    force_initial_plaid_account_fetch: 'yes',
  });

  const handleCreateGoal = () => setShowCreateModal(!showCreateModal);

  const handleCreateToggleModal = () => setShowCreateModal(!showCreateModal);

  const handleUpdateToggleModal = () => setShowUpdateModal(!showUpdateModal);

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
          <Section className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {recommendationData.length > 0 &&
              recommendationData.map((recommendation) => (
                <Section.Item key={recommendation.id}>
                  <RecommendationCard key={recommendation.id} />
                </Section.Item>
              ))}
          </Section>
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
            setShowModal={handleCreateToggleModal}
            title='Create New Goal'
          />
        </div>
      )}
      {showUpdateModal && (
        <div>
          <UpdateGoalModal
            showModal={showUpdateModal}
            setShowModal={handleUpdateToggleModal}
            title='Update Goal'
          />
        </div>
      )}
    </div>
  );
};

export default Goal;
