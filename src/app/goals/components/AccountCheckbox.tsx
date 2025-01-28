import React from 'react';
import InputField from '@/shared-components/InputField';
import { DollarIcon } from '@/assets/icons/bussiness-panel-icons';
import {
  IUserAccounts,
  ILinkedAccount,
  IFormValues,
} from '@/app/goals/interface/goal-interface';
import {
  Control,
  UseFormWatch,
  UseFormTrigger,
  FieldErrors,
} from 'react-hook-form';

interface AccountCheckboxProps {
  account: IUserAccounts;
  isSelected: boolean;
  existingContributionLimit: string;
  goalPurpose: string;
  control: Control;
  formErrors: FieldErrors<IFormValues>;
  watch: UseFormWatch<IFormValues>;
  trigger: UseFormTrigger<IFormValues>;
  //eslint-disable-next-line
  updateTempAccounts: (isChecked: boolean, acc: IUserAccounts) => void;
}

const AccountCheckbox: React.FC<AccountCheckboxProps> = ({
  account,
  isSelected,
  existingContributionLimit,
  goalPurpose,
  control,
  formErrors,
  watch,
  trigger,
  updateTempAccounts,
}) => {
  return (
    <div key={account.account.id} className='rounded-lg border p-4 shadow'>
      <div className='flex items-center gap-4'>
        <input
          type='checkbox'
          id={`account-${account.account.id}`}
          checked={isSelected}
          onChange={(e) => updateTempAccounts(e.target.checked, account)}
          className='h-5 w-5'
        />
        <div className='flex flex-col'>
          <label htmlFor={`account-${account.account.id}`} className='flex-1'>
            {account.account.name}
          </label>
          <label htmlFor={`account-${account.account.id}`} className='flex-1'>
            Available Balance: ${account.account.balances_available}
          </label>
          <label htmlFor={`account-${account.account.id}`} className='flex-1'>
            Current Balance: ${account.account.balances_current}
          </label>
        </div>
      </div>

      {isSelected && goalPurpose !== 'repayment' && (
        <div className='mt-4'>
          <InputField
            type='number'
            label='Contribution Limit'
            icon={<DollarIcon />}
            id={`contribution-${account.account.id}`}
            name={`tempSelectedAccounts.${
              watch('tempSelectedAccounts')?.findIndex(
                (item: ILinkedAccount) => item.account_id === account.account.id
              ) ?? 0
            }.contribution_limit`}
            control={control}
            error={
              formErrors.tempSelectedAccounts?.[
                watch('tempSelectedAccounts')?.findIndex(
                  (item: ILinkedAccount) =>
                    item.account_id === account.account.id
                ) ?? 0
              ]?.contribution_limit?.message
            }
            value={existingContributionLimit}
            onCustomChange={() => {
              trigger(
                `tempSelectedAccounts.${
                  watch('tempSelectedAccounts')?.findIndex(
                    (item: ILinkedAccount) =>
                      item.account_id === account.account.id
                  ) ?? 0
                }.contribution_limit`
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AccountCheckbox;
