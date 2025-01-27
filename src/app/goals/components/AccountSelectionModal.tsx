'use client';
import React from 'react';
import { Modal, notification } from 'antd';
import CustomButton from '@/shared-components/CustomButton';
import InputField from '@/shared-components/InputField';
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

interface AccountSelectionModalProps {
  showModal: boolean;
  //eslint-disable-next-line
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
    notification.error({ message: message, placement: 'topRight' });
  };

  return (
    <Modal
      title='Account Selection'
      open={showModal}
      centered
      onCancel={() => {
        setShowModal(false);
        setValue('tempSelectedAccounts', []); // Clear temp selections when modal is closed
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
      {/* Scrollable content area */}
      <div className='custom-scrollbar h-full overflow-y-auto pr-6'>
        <div className='grid grid-cols-1 gap-4 pb-24'>
          {userAccounts.map((acc: IUserAccounts) => {
            const isSelected =
              (watch('tempSelectedAccounts') || []).some(
                (item: ILinkedAccount) => item.account_id === acc.account.id
              ) ||
              (watch('linked_accounts') || []).some(
                (item: ILinkedAccount) => item.account_id === acc.account.id
              );

            const existingContributionLimit =
              (watch('linked_accounts') || []).find(
                (item: ILinkedAccount) => item.account_id === acc.account.id
              )?.contribution_limit || '';

            return (
              <div
                key={acc.account.id}
                className='rounded-lg border p-4 shadow'
              >
                <div className='flex items-center gap-4'>
                  <input
                    type='checkbox'
                    id={`account-${acc.account.id}`}
                    checked={isSelected}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const currentTempAccounts = [
                        ...(watch('tempSelectedAccounts') || []),
                      ];

                      if (goalPurpose === 'repayment' && isChecked) {
                        setValue('tempSelectedAccounts', [
                          {
                            account_id: acc.account.id,
                            contribution_limit: existingContributionLimit,
                          },
                        ]);
                        return;
                      }

                      if (isChecked) {
                        currentTempAccounts.push({
                          account_id: acc.account.id,
                          contribution_limit: existingContributionLimit,
                        });
                        setValue('tempSelectedAccounts', currentTempAccounts);
                      } else {
                        const filteredAccounts = currentTempAccounts.filter(
                          (item) => item.account_id !== acc.account.id
                        );
                        setValue('tempSelectedAccounts', filteredAccounts);
                      }
                    }}
                    className='h-5 w-5'
                  />
                  <div className='flex flex-col'>
                    <label
                      htmlFor={`account-${acc.account.id}`}
                      className='flex-1'
                    >
                      {acc.account.name}
                    </label>
                    <label
                      htmlFor={`account-${acc.account.id}`}
                      className='flex-1'
                    >
                      Available Balance: {acc.account.balances_available}
                    </label>
                    <label
                      htmlFor={`account-${acc.account.id}`}
                      className='flex-1'
                    >
                      Current Balance: {acc.account.balances_current}
                    </label>
                  </div>
                </div>

                {isSelected && goalPurpose !== 'repayment' && (
                  <div className='mt-4'>
                    <InputField
                      type='number'
                      label='Monthly Contribution'
                      labelPosition='outside'
                      id={`contribution-${acc.account.id}`}
                      name={`tempSelectedAccounts.${
                        watch('tempSelectedAccounts')?.findIndex(
                          (item: ILinkedAccount) =>
                            item.account_id === acc.account.id
                        ) ?? 0
                      }.contribution_limit`}
                      control={control as unknown as Control<FieldValues>}
                      error={
                        formErrors.tempSelectedAccounts?.[
                          watch('tempSelectedAccounts')?.findIndex(
                            (item: ILinkedAccount) =>
                              item.account_id === acc.account.id
                          ) ?? 0
                        ]?.contribution_limit?.message
                      }
                      value={existingContributionLimit}
                      onCustomChange={() => {
                        trigger(
                          `tempSelectedAccounts.${
                            watch('tempSelectedAccounts')?.findIndex(
                              (item: ILinkedAccount) =>
                                item.account_id === acc.account.id
                            ) ?? 0
                          }.contribution_limit`
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed button container */}
      <div className='absolute bottom-0 left-0 right-0 border-t bg-white px-6 py-4'>
        <div className='flex items-center justify-between'>
          <CustomButton
            type='button'
            title='Select Account'
            onClick={async () => {
              const isValid = await trigger('tempSelectedAccounts');

              if (!isValid) {
                return;
              }

              const tempAccounts = watch('tempSelectedAccounts') || [];
              const currentLinkedAccounts = watch('linked_accounts') || [];

              if (tempAccounts.length === 0) {
                showToast('Please select at least one account');
                return;
              }

              const combinedAccounts = [
                ...currentLinkedAccounts,
                ...tempAccounts,
              ];

              const uniqueAccounts = Array.from(
                new Map(
                  combinedAccounts.map((account) => [
                    account.account_id,
                    account,
                  ])
                ).values()
              );

              setValue('linked_accounts', uniqueAccounts);
              setValue('tempSelectedAccounts', []);
              setShowModal(false);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AccountSelectionModal;
