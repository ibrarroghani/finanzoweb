import React from 'react';
import {
  IGoalFormData,
  ILinkedAccount,
  IUserAccounts,
} from '@/app/goals/interface/goal-interface';
import { UseFormSetValue } from 'react-hook-form';
import { DeleteIcon } from '@/assets/icons/bussiness-panel-icons';

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
  const handleRemoveAccount = (index: number) => {
    const currentAccounts = [...linkedAccounts];
    currentAccounts.splice(index, 1);
    setValue('linked_accounts', currentAccounts);
  };

  return (
    <div className='mb-2'>
      <h3 className='mb-1 text-lg font-semibold'>Selected Accounts</h3>
      <div className='space-y-2'>
        {linkedAccounts.map((account, index) => {
          const accountDetails = userAccounts.find(
            (acc: IUserAccounts) => acc.account.id === account.account_id
          );

          if (!accountDetails) return null;

          return (
            <div
              key={index}
              className='card flex items-center justify-between rounded-lg border p-4 shadow'
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
                  <p className='text-sm'>
                    Contribution Limit: ${account.contribution_limit}
                  </p>
                )}
              </div>
              <button type='button' onClick={() => handleRemoveAccount(index)}>
                <p title='Remove Account'>
                  <DeleteIcon color='red' />
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedAccounts;
