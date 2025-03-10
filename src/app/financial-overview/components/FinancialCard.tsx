'use client';
import React, { useState } from 'react';
import TransactionDetailsModal from './TransactionDetailsModal';

interface IBankCardProps {
  //eslint-disable-next-line
  data: any;
}

const FinancialCard: React.FC<IBankCardProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className='card card-border w-full'>
      <p className='card-title'>{data.name}</p>
      <p className='card-subtitle'>
        {data.type === 'loan' ? (
          <>Loan Amount: ${data.balances_current}</>
        ) : (
          <>Balance: ${data.balances_current}</>
        )}
      </p>
      <button
        onClick={() => setShowModal(!showModal)}
        className='card-link text-link-secondary'
      >
        View Details
      </button>

      {showModal && (
        <div>
          <TransactionDetailsModal
            showModal={showModal}
            setShowModal={handleToggleModal}
            title='Transaction Details'
            accountId={data.id}
          />
        </div>
      )}
    </div>
  );
};

export default FinancialCard;
