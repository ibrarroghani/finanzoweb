import React from 'react';
import {
  IGoalFormData,
  ILinkedAccount,
  IUserAccounts,
} from '@/app/goals/interface/goal-interface';
import { UseFormSetValue } from 'react-hook-form';

interface SelectedAccountsProps {
  linkedAccounts: ILinkedAccount[];
  userAccounts: IUserAccounts[];
  goalPurpose: string;
  setValue: UseFormSetValue<IGoalFormData>;
}

const SelectedAccounts: React.FC<SelectedAccountsProps> = ({
  linkedAccounts,
  userAccounts,
  goalPurpose,
  setValue,
}) => {
  return (
    <div className='mt-6'>
      <h3 className='mb-4 text-lg font-semibold'>Selected Accounts</h3>
      <div className='space-y-4'>
        {linkedAccounts.map((account, index) => {
          const accountDetails = userAccounts.find(
            (acc: IUserAccounts) => acc.account.id === account.account_id
          );

          if (!accountDetails) return null;

          return (
            <div
              key={index}
              className='flex items-center justify-between rounded-lg border bg-gray-50 p-4 shadow'
            >
              <div>
                <p className='font-medium'>{accountDetails.account.name}</p>
                <p className='text-sm'>
                  Available Balance: $
                  {accountDetails.account.balances_available}
                </p>
                <p className='text-sm'>
                  Current Balance: ${accountDetails.account.balances_current}
                </p>
                {goalPurpose !== 'repayment' && (
                  <p className='text-sm text-gray-600'>
                    Contribution Limit: ${account.contribution_limit}
                  </p>
                )}
              </div>
              <button
                type='button'
                className='text-red-500 hover:text-red-700'
                onClick={() => {
                  const currentAccounts = [...linkedAccounts];
                  currentAccounts.splice(index, 1);
                  setValue('linked_accounts', currentAccounts);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedAccounts;
