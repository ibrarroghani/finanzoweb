'use client';
import React, { useEffect, useState } from 'react';
import AccountDetailsModal from './AccountDetailsModal';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useGetBankInstitutionDetails from '@/hooks/data-hooks/account/use-get-bank-institution-details';

interface IInstitution {
  plaid_institution_id: string;
  name: string;
  logo: null;
  slug: string;
}

interface ICount {
  name: string;
  type: string;
  count: number;
}

interface IBankData {
  institution: IInstitution;
  counts: ICount[];
}
interface IBankCardProps {
  bankData: IBankData;
}

const BankCard: React.FC<IBankCardProps> = ({ bankData }) => {
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const [showModal, setShowModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);

  const { institution, counts } = bankData;

  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const {
    data: accountDetailsResponse,
    //isLoading:isAccountListLoading,
    //isError: isAccountListError,
  } = useGetBankInstitutionDetails(slug, institution.plaid_institution_id, {
    force_initial_plaid_account_fetch: 'no',
  });

  useEffect(() => {
    if (accountDetailsResponse && accountDetailsResponse.data) {
      setAccountDetails(accountDetailsResponse.data?.accounts);
    }
  }, [accountDetailsResponse]);

  return (
    <div className='card card-border w-full'>
      <p className='card-title'>{institution.name}</p>
      {counts.map((count, index) => (
        <p key={index} className='card-subtitle'>
          {count.name}: {count.count}
        </p>
      ))}
      <p
        onClick={() => setShowModal(true)}
        className='text-small rounded-extra-small w-full cursor-pointer bg-card p-1'
      >
        View Account Details
      </p>
      <p>
        <Link href='#' className='card-link text-link-secondary'>
          view statement
        </Link>
      </p>

      {showModal && (
        <div>
          <AccountDetailsModal
            showModal={showModal}
            setShowModal={handleToggleModal}
            title='Account Details'
            data={accountDetails}
          />
        </div>
      )}
    </div>
  );
};

export default BankCard;
