import { Modal, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Spinner from '@/shared-components/Spinner';
import useGetTransactionByAccount from '@/hooks/data-hooks/account/use-get-transaction-by-account';

interface IClientModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
  accountId: string;
}

const TransactionDetailsModal: React.FC<IClientModalProps> = ({
  title,
  showModal,
  setShowModal,
  accountId,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //eslint-disable-next-line
  const [pageSize, setPageSize] = useState(10);
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const {
    data: transactionDetailsResponse,
    isLoading: isTransactionListLoading,
  } = useGetTransactionByAccount(accountId, slug, {
    limit: pageSize,
    page: currentPage,
  });

  useEffect(() => {
    if (transactionDetailsResponse && transactionDetailsResponse.data) {
      setTransactions(transactionDetailsResponse.data);
    }
  }, [transactionDetailsResponse]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          {isTransactionListLoading ? (
            <div className='flex flex-1 items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <>
              {transactions.length > 0 ? (
                //eslint-disable-next-line
                transactions.map((transaction: any) => (
                  <div
                    key={transaction.transaction_id}
                    className='card-border card mb-2 mt-2'
                  >
                    <p className='card-title'>{transaction.name}</p>
                    <div className='flex justify-between'>
                      <p className='card-subtitle'>{transaction.category[0]}</p>
                      <p className='my-1 font-bold capitalize'>
                        {transaction.amount < 0
                          ? `-$${Math.abs(transaction.amount).toFixed(2)}`
                          : `$${transaction.amount.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='card-subtitle mt-20 text-center'>
                  No transactions found
                </p>
              )}
            </>
          )}

          {!isTransactionListLoading && transactions.length > 0 && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              //eslint-disable-next-line
              total={(transactionDetailsResponse as any)?.meta?.totalItems || 0}
              onChange={handlePageChange}
              className='mt-4'
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TransactionDetailsModal;
