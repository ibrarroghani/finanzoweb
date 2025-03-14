'use client';
import React, { useState } from 'react';
import AccountDetailsModal from './AccountDetailsModal';
import { IInstitutions } from '../interface/account-interface';

interface IBankCardProps {
  bankData: IInstitutions;
}

const BankCard: React.FC<IBankCardProps> = ({ bankData }) => {
  const [showModal, setShowModal] = useState(false);

  const { institution, counts } = bankData;

  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className='card card-border w-full'>
      <p className='card-title'>{institution.name}</p>
      <p className='card-subtitle'>
        Accounts: {counts.reduce((total, count) => total + count.count, 0)}
      </p>
      <button
        onClick={() => setShowModal(true)}
        className='card-link text-link-secondary'
      >
        View Details
      </button>

      {showModal && (
        <div>
          <AccountDetailsModal
            showModal={showModal}
            setShowModal={handleToggleModal}
            title='Bank Accounts'
            institutionSlug={institution.slug}
          />
        </div>
      )}
    </div>
  );
};

export default BankCard;
