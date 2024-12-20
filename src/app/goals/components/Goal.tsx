'use client';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import { ClientAddIcon } from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import React from 'react';
import GoalModal from './GoalModal';
import RecommendationCard from './RecommendationCard';
import { goalData, recommendationData } from '@/utils/dummy-data';
import Section from '@/app/dashboard/components/Section';
import GoalEmpty from './GoalEmpty';
import GoalsSection from '@/app/dashboard/components/GoalsSection';
import { useGoalPageContext } from '../context/GoalPageContext';

const Goal = () => {
  const {
    showCreateModal,
    setShowCreateModal,
    showUpdateModal,
    setShowUpdateModal,
  } = useGoalPageContext();
  // const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  // const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const handleCreateGoal = () => setShowCreateModal(true);
  const handleCreateToggleModal = () => {
    setShowCreateModal(!showCreateModal);
  };
  const handleUpdateToggleModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  return (
    <div className='p-4'>
      <ClientDetailsCard />
      {goalData.length > 0 ? (
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
          <GoalModal
            showModal={showCreateModal}
            setShowModal={handleCreateToggleModal}
            title='Create New Goal'
          />
        </div>
      )}
      {showUpdateModal && (
        <div>
          <GoalModal
            showModal={showUpdateModal}
            setShowModal={handleUpdateToggleModal}
            title='Create New Goal'
          />
        </div>
      )}
    </div>
  );
};

export default Goal;
