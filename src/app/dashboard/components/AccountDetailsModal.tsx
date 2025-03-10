import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useGetBankInstitutionDetails from '@/hooks/data-hooks/account/use-get-bank-institution-details';
import Spinner from '@/shared-components/Spinner';
import { IAccount } from '../interface/account-interface';
import TransactionDetailsModal from '@/app/financial-overview/components/TransactionDetailsModal';

interface IClientModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
  institutionSlug: string;
}

const AccountDetailsModal: React.FC<IClientModalProps> = ({
  title,
  showModal,
  setShowModal,
  institutionSlug,
}) => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionAccountId, setTransactionAccountId] = useState('');
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const handleToggleTransactionModal = () => {
    setShowTransactionModal((prev) => !prev);
  };

  const { data: accountDetailsResponse, isLoading: isAccountListLoading } =
    useGetBankInstitutionDetails(slug, institutionSlug, {
      force_initial_plaid_account_fetch: 'yes',
    });

  useEffect(() => {
    if (accountDetailsResponse && accountDetailsResponse.data) {
      setAccounts(accountDetailsResponse.data?.accounts);
    }
  }, [accountDetailsResponse]);

  const handleTransactionDetails = (accountId: string) => {
    setShowTransactionModal(true);
    setTransactionAccountId(accountId);
  };

  return (
    <div>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <div className='custom-scrollbar flex h-[500px] flex-col overflow-y-auto pr-4'>
          {isAccountListLoading ? (
            <div className='flex flex-1 items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <>
              {accounts.length > 0 &&
                accounts.map((account: IAccount) => (
                  <div key={account.id} className='card-border card mt-2'>
                    <p className='card-title'>{account.name}</p>
                    <p className='card-subtitle'>
                      Balance: ${account.balances_current}
                    </p>

                    <p
                      onClick={() => handleTransactionDetails(account.id)}
                      className='card-link text-link-secondary'
                    >
                      View Statement
                    </p>
                  </div>
                ))}
            </>
          )}
        </div>
      </Modal>

      {showTransactionModal && (
        <div>
          <TransactionDetailsModal
            showModal={showTransactionModal}
            setShowModal={handleToggleTransactionModal}
            title='Transaction Details'
            accountId={transactionAccountId}
          />
        </div>
      )}
    </div>
  );
};

export default AccountDetailsModal;
