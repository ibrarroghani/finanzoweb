import CustomButton from '@/shared-components/CustomButton';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, notification, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm, Control, FieldValues, Controller } from 'react-hook-form';
import { goalCreateValidationSchema } from '../validations/goal-create-validation-schema';
import useCreateGoal from '@/hooks/data-hooks/goal/use-create-goal';
import { convertDateApiFormat, getTomorrowDate } from '@/utils/date-formatter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import SelectField from '@/shared-components/SelectField';
import TextareaField from '@/shared-components/TextareaField';
import useGetBankAccounts from '@/hooks/data-hooks/account/use-get-bank-accounts';
import {
  IGoalFormData,
  ILinkedAccount,
  IUserAccounts,
} from '@/app/goals/interface/goal-interface';

interface IGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

const INITIAL_GOAL_FORM_DATA: IGoalFormData = {
  title: '',
  goal_purpose: '',
  description: '',
  goal_amount: '',
  target_date: getTomorrowDate(),
  goal_status: 'active',
  linked_accounts: [],
  tempSelectedAccounts: [],
};

const GoalModal: React.FC<IGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const [userAccounts, setUserAccounts] = useState<IUserAccounts[]>([]);
  const [showAccountSelectionModal, setShowAccountSelectionModal] =
    useState(false);
  const slug = useSelector((state: RootState) => state.auth.client.slug);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
    trigger,
  } = useForm<IGoalFormData>({
    defaultValues: INITIAL_GOAL_FORM_DATA,
    resolver: yupResolver<IGoalFormData>(goalCreateValidationSchema),
    reValidateMode: 'onChange',
  });

  const goalPurpose = watch('goal_purpose');
  const linkedAccounts = watch('linked_accounts');

  const { mutate: CreateGoal, isPending } = useCreateGoal(slug);
  const { data: bankAccounts, isLoading } = useGetBankAccounts(slug, {
    force_initial_plaid_account_fetch: 'yes',
  });

  const handleGoalCreate = (data: IGoalFormData) => {
    const formData = {
      title: data.title,
      goal_purpose: data.goal_purpose,
      description: data.description,
      goal_amount: Number(data.goal_amount),
      target_date: convertDateApiFormat(data.target_date),
      goal_status: data.goal_status,
      linked_accounts: data.linked_accounts.map((account) => ({
        account_id: account.account_id,
        contribution_limit: Number(account.contribution_limit),
      })),
    };

    CreateGoal(formData, {
      onSuccess: () => {
        setShowModal();
      },
    });
  };

  useEffect(() => {
    if (bankAccounts?.data) {
      setUserAccounts(bankAccounts.data ?? []);
    }
  }, [bankAccounts]);

  // Add this useEffect to handle purpose changes
  useEffect(() => {
    if (goalPurpose === 'repayment' && linkedAccounts.length > 1) {
      // Keep only the first account when switching to repayment
      setValue('linked_accounts', [linkedAccounts[0]]);
    }
  }, [goalPurpose, linkedAccounts, setValue]);

  const showToast = (message: string) => {
    notification.error({ message: message, placement: 'topRight' });
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleGoalCreate)}>
          <InputField
            id='title'
            name='title'
            control={control as unknown as Control<FieldValues>}
            error={formErrors.title?.message}
            label='Goal Title'
            labelPosition='outside'
          />
          <SelectField
            control={control as unknown as Control<FieldValues>}
            name='goal_purpose'
            label='Goal Purpose'
            error={formErrors.goal_purpose?.message}
            options={[
              { value: 'savings', label: 'Savings' },
              { value: 'repayment', label: 'Repayment' },
            ]}
          />

          <TextareaField
            label='Goal Description'
            control={control as unknown as Control<FieldValues>}
            name='description'
            error={formErrors.description?.message}
            rows={3}
          />
          <InputField
            id='goal_amount'
            name='goal_amount'
            control={control as unknown as Control<FieldValues>}
            error={formErrors.goal_amount?.message}
            label='Target Amount'
            type='number'
            labelPosition='outside'
          />

          <DatePickerField
            control={control as unknown as Control<FieldValues>}
            name='target_date'
            label='Target Date'
            error={formErrors.target_date?.message}
          />

          {/* Linked Accounts Section */}
          <div className='my-2'>
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                {watch('linked_accounts').length === 0 && (
                  <p className='text-sm text-red-500'>
                    {formErrors.linked_accounts?.message}
                  </p>
                )}
              </div>
              <div className='ml-auto w-32'>
                <CustomButton
                  className='w-24 bg-primary-dark text-primary-light'
                  type='button'
                  title='Add Account'
                  onClick={() => {
                    setShowAccountSelectionModal(true);
                  }}
                  disable={
                    !goalPurpose ||
                    (goalPurpose === 'repayment' &&
                      linkedAccounts.length >= 1) ||
                    isLoading
                  }
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {linkedAccounts.length > 0 && (
            <div className='mt-6'>
              <h3 className='mb-4 text-lg font-semibold'>Selected Accounts</h3>
              <div className='space-y-4'>
                {linkedAccounts.map((account, index) => {
                  const accountDetails = userAccounts.find(
                    (acc: IUserAccounts) =>
                      acc.account.id === account.account_id
                  );

                  if (!accountDetails) return null;

                  return (
                    <div
                      key={index}
                      className='flex items-center justify-between rounded-lg border bg-gray-50 p-4 shadow'
                    >
                      <div>
                        <p className='font-medium'>
                          {accountDetails.account.name}
                        </p>
                        {goalPurpose !== 'repayment' && (
                          <p className='text-sm text-gray-600'>
                            Monthly Contribution: ${account.contribution_limit}
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
          )}

          <div className='flex justify-between py-4'>
            <div className='ml-auto flex gap-4'>
              <p className='font-light'>Goal Status</p>
              <Controller
                control={control}
                name='goal_status'
                render={({ field }) => (
                  <Radio.Group {...field} buttonStyle='solid' className='flex'>
                    <Radio.Button
                      className='px-4 first:rounded-l-full'
                      value='active'
                    >
                      Active
                    </Radio.Button>
                    <Radio.Button
                      className='px-4 last:rounded-r-full'
                      value='paused'
                    >
                      Pause
                    </Radio.Button>
                  </Radio.Group>
                )}
              />
            </div>
          </div>

          <div className='ml-auto w-32'>
            <CustomButton
              type='submit'
              title='save changes'
              disable={isPending}
            />
          </div>
        </form>
      </Modal>

      {showAccountSelectionModal && (
        <Modal
          title='Account Selection'
          open={showAccountSelectionModal}
          centered
          onCancel={() => {
            setShowAccountSelectionModal(false);
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

                // Find the existing contribution limit if the account is already linked
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
                            // For repayment, only allow one account
                            setValue('tempSelectedAccounts', [
                              {
                                account_id: acc.account.id,
                                contribution_limit: existingContributionLimit, // Use existing value if available
                              },
                            ]);
                            return;
                          }

                          if (isChecked) {
                            // Only add if checkbox is checked
                            currentTempAccounts.push({
                              account_id: acc.account.id,
                              contribution_limit: existingContributionLimit, // Use existing value if available
                            });
                            setValue(
                              'tempSelectedAccounts',
                              currentTempAccounts
                            );
                          } else {
                            // Remove if unchecked
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
                              (item) => item.account_id === acc.account.id
                            ) ?? 0
                          }.contribution_limit`}
                          control={control as unknown as Control<FieldValues>}
                          error={
                            formErrors.tempSelectedAccounts?.[
                              watch('tempSelectedAccounts')?.findIndex(
                                (item) => item.account_id === acc.account.id
                              ) ?? 0
                            ]?.contribution_limit?.message
                          }
                          value={existingContributionLimit} // Set default value to existing contribution limit
                          onCustomChange={() => {
                            // Manually trigger validation for the field
                            trigger(
                              `tempSelectedAccounts.${
                                watch('tempSelectedAccounts')?.findIndex(
                                  (item) => item.account_id === acc.account.id
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
                  const isValid = await trigger('tempSelectedAccounts'); // Trigger validation manually

                  if (!isValid) {
                    // If validation fails, do not proceed
                    return;
                  }

                  const tempAccounts = watch('tempSelectedAccounts') || [];
                  const currentLinkedAccounts = watch('linked_accounts') || [];

                  // Validate if any account is selected
                  if (tempAccounts.length === 0) {
                    showToast('Please select at least one account');
                    return;
                  }

                  // Combine current linked accounts with temp accounts and remove duplicates
                  const combinedAccounts = [
                    ...currentLinkedAccounts,
                    ...tempAccounts,
                  ];

                  // Use a Set to filter out duplicates based on account_id
                  const uniqueAccounts = Array.from(
                    new Map(
                      combinedAccounts.map((account) => [
                        account.account_id,
                        account,
                      ])
                    ).values()
                  );

                  // If all validations pass, update the linked accounts and close modal
                  setValue('linked_accounts', uniqueAccounts);
                  setValue('tempSelectedAccounts', []);
                  setShowAccountSelectionModal(false);
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default GoalModal;
