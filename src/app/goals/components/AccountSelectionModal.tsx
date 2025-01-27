'use client';
import React from 'react';
import { Modal, notification } from 'antd';
import CustomButton from '@/shared-components/CustomButton';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import {
  IFormValues,
  ILinkedAccount,
  IUserAccounts,
} from '@/app/goals/interface/goal-interface';
import AccountCheckbox from './AccountCheckbox';

interface AccountSelectionModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  userAccounts: IUserAccounts[];
  goalPurpose: string;
  control: Control<IFormValues>;
  formErrors: FieldErrors<IFormValues>;
  watch: UseFormWatch<IFormValues>;
  setValue: UseFormSetValue<IFormValues>;
  trigger: UseFormTrigger<IFormValues>;
}

const AccountSelectionModal: React.FC<AccountSelectionModalProps> = ({
  showModal,
  setShowModal,
  userAccounts,
  goalPurpose,
  control,
  formErrors,
  watch,
  setValue,
  trigger,
}) => {
  const showToast = (message: string) => {
    notification.error({ message, placement: 'topRight' });
  };

  const updateTempAccounts = (isChecked: boolean, acc: IUserAccounts) => {
    const currentTempAccounts = [...(watch('tempSelectedAccounts') || [])];
    const existingContributionLimit = getExistingContributionLimit(acc);

    if (goalPurpose === 'repayment' && isChecked) {
      setValue('tempSelectedAccounts', [
        {
          account_id: acc.account.id,
          contribution_limit: existingContributionLimit,
        },
      ]);
      return;
    }

    const updatedAccounts = isChecked
      ? [
          ...currentTempAccounts,
          {
            account_id: acc.account.id,
            contribution_limit: existingContributionLimit,
          },
        ]
      : currentTempAccounts.filter(
          (item) => item.account_id !== acc.account.id
        );

    setValue('tempSelectedAccounts', updatedAccounts);
  };

  const getExistingContributionLimit = (acc: IUserAccounts) => {
    return (
      (watch('linked_accounts') || []).find(
        (item: ILinkedAccount) => item.account_id === acc.account.id
      )?.contribution_limit || ''
    );
  };

  const handleSelectAccount = async () => {
    const isValid = await trigger('tempSelectedAccounts');
    if (!isValid) return;

    const tempAccounts = watch('tempSelectedAccounts') || [];
    if (tempAccounts.length === 0) {
      showToast('Please select at least one account');
      return;
    }

    const uniqueAccounts = getUniqueAccounts(tempAccounts);
    setValue('linked_accounts', uniqueAccounts);
    setValue('tempSelectedAccounts', []);
    setShowModal(false);
  };

  const getUniqueAccounts = (tempAccounts: ILinkedAccount[]) => {
    const currentLinkedAccounts = watch('linked_accounts') || [];
    const combinedAccounts = [...currentLinkedAccounts, ...tempAccounts];
    return Array.from(
      new Map(
        combinedAccounts.map((account) => [account.account_id, account])
      ).values()
    );
  };

  const isAccountSelected = (acc: IUserAccounts) => {
    return (
      (watch('tempSelectedAccounts') || []).some(
        (item: ILinkedAccount) => item.account_id === acc.account.id
      ) ||
      (watch('linked_accounts') || []).some(
        (item: ILinkedAccount) => item.account_id === acc.account.id
      )
    );
  };

  return (
    <Modal
      title='Account Selection'
      open={showModal}
      centered
      onCancel={() => {
        setShowModal(false);
        setValue('tempSelectedAccounts', []);
      }}
      footer={null}
      className='account-selection-modal'
      styles={{
        body: {
          height: '70vh',
          padding: 0,
          position: 'relative',
        },
      }}
    >
      <div className='custom-scrollbar h-full overflow-y-auto pr-6'>
        <div className='grid grid-cols-1 gap-4 pb-24'>
          {userAccounts.map((acc) => (
            <AccountCheckbox
              key={acc.account.id}
              account={acc}
              isSelected={isAccountSelected(acc)}
              existingContributionLimit={getExistingContributionLimit(acc)}
              goalPurpose={goalPurpose}
              control={control as unknown as Control<FieldValues>}
              formErrors={formErrors}
              watch={watch}
              trigger={trigger}
              updateTempAccounts={updateTempAccounts}
            />
          ))}
        </div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 border-t bg-white px-6 py-4'>
        <div className='flex items-center justify-between'>
          <CustomButton
            type='button'
            title='Select Account'
            onClick={handleSelectAccount}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AccountSelectionModal;
