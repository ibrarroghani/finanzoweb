'use client';
import React, { useState } from 'react';
import { ClientAddIcon } from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';
import AddClientModal from './AddClientModal';

const SidebarFooter = () => {
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className='-mx-2 border-t border-t-border-primary'>
        <div className='my-4 pl-4 pr-8'>
          <CustomButton
            title='Add Client'
            icon={<ClientAddIcon />}
            className='btn-gradient'
            onClick={handleToggleModal}
          />
        </div>
      </div>
      {showModal && (
        <AddClientModal
          showModal={showModal}
          setShowModal={handleToggleModal}
          title='Add New Client'
        />
      )}
    </>
  );
};

export default SidebarFooter;
