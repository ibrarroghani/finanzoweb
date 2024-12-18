'use client';
import React, { useEffect, useState } from 'react';
import AccountDetailsModal from './AccountDetailsModal';
import Link from 'next/link';
import useGetBankAccountDetails from '@/hooks/data-hooks/account/use-get-bank-account-details';

// interface IBankData {
//   title: string;
//   account: string;
//   card: string;
// }
// interface IBankCardProps {
//   bankData: IBankData;
// }

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

// const getAccountCount = (data: ICount[]) => {

// }

const BankCard: React.FC<IBankCardProps> = ({ bankData }) => {
  const [showModal, setShowModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);

  const { institution, counts } = bankData;
  console.log('institution.slug', institution.slug);

  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const {
    data: AccountDetailsResponse,
    //isLoading:AccountListLoading,
    //isError: AccountListError,
  } = useGetBankAccountDetails(institution.slug, {
    force_initial_plaid_account_fetch: 'yes',
  });

  useEffect(() => {
    if (AccountDetailsResponse && AccountDetailsResponse.data) {
      console.log('accountDetails', AccountDetailsResponse.data);
      setAccountDetails(AccountDetailsResponse.data?.accounts);
    }
  }, [AccountDetailsResponse, institution.slug]);

  return (
    <div className='card card-border w-full'>
      <p className='card-title'>{institution.name}</p>
      {counts.map((count, index) => (
        <p key={index} className='card-subtitle'>
          {count.name}: {count.count}
        </p>
      ))}
      {/* <p className='card-subtitle'>card: 38484994</p> */}
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
