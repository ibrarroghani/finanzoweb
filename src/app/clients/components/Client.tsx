'use client';
import React, { useState } from 'react';
import ClientModal from './ClientModal';

const Client = () => {
  const [showModal, setShowModal] = useState(true);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className=''>
      <ClientModal
        showModal={showModal}
        setShowModal={handleToggleModal}
        title='Search Client'
      />
    </div>
  );
};

export default Client;
