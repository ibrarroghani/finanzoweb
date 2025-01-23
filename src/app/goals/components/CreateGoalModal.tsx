import CustomButton from '@/shared-components/CustomButton';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Radio } from 'antd';
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
//import useUserAccounts from '@/hooks/data-hooks/user/use-user-accounts';

// interface IBankAccount {
//   id: string;
//   user_id: number;
//   client_institution_id: number;
//   balances_available: string;
//   balances_current: string;
//   balances_iso_currency_code: string;
//   balances_limit: string;
//   balances_unofficial_currency_code: null;
//   mask: string;
//   name: string;
//   official_name: string;
//   persistent_account_id: null;
//   subtype: string;
//   type: string;
//   created_at: Date;
//   updated_at: Date;
// }

interface IGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

export interface ILinkedAccount {
  account_id: string;
  contribution_limit?: string;
}

export interface IGoalFormData {
  title: string;
  goal_purpose: string;
  description: string;
  goal_amount: string;
  target_date: Date;
  goal_status: 'active' | 'paused';
  linked_accounts: ILinkedAccount[];
}

const GoalModal: React.FC<IGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const slug = useSelector((state: RootState) => state.auth.client.slug);
  const [userAccounts, setUserAccounts] = useState([]);
  // const userAccounts = [
  //   {
  //     id: '1',
  //     name: 'Account 1',
  //   },
  //   {
  //     id: '2',
  //     name: 'Account 2',
  //   },
  // ];
  const initialValue: IGoalFormData = {
    title: '',
    goal_purpose: '',
    description: '',
    goal_amount: '',
    target_date: getTomorrowDate(),
    goal_status: 'active',
    linked_accounts: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    setValue,
  } = useForm<IGoalFormData>({
    defaultValues: initialValue,
    resolver: yupResolver<IGoalFormData>(goalCreateValidationSchema),
  });

  const goalPurpose = watch('goal_purpose');
  const linkedAccounts = watch('linked_accounts');

  const { mutate: CreateGoal, isPending } = useCreateGoal(slug);
  const { data: bankAccounts, isLoading } = useGetBankAccounts(slug, {
    force_initial_plaid_account_fetch: 'yes',
  });

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

  const handleGoalCreate = (data: IGoalFormData) => {
    const {
      title,
      goal_purpose,
      description,
      goal_amount,
      target_date,
      goal_status,
      linked_accounts,
    } = data;

    const formData = {
      title,
      goal_purpose,
      description,
      goal_amount: Number(goal_amount),
      target_date: convertDateApiFormat(target_date),
      goal_status,
      linked_accounts: linked_accounts.map((account) => ({
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
                    const currentAccounts = watch('linked_accounts');
                    setValue('linked_accounts', [
                      ...currentAccounts,
                      { account_id: '', contribution_limit: '' },
                    ]);
                  }}
                  disable={
                    (goalPurpose === 'repayment' &&
                      linkedAccounts.length >= 1) ||
                    isLoading
                  }
                />
              </div>
            </div>

            {/* Dynamic Account Fields */}
            <div className='my-2'>
              <Controller
                control={control}
                name='linked_accounts'
                render={({ field }) => (
                  <div className='space-y-4'>
                    {field.value.map((account, index) => (
                      <div key={index} className='flex items-start gap-4'>
                        <div className='flex-1'>
                          <SelectField
                            control={control as unknown as Control<FieldValues>}
                            name={`linked_accounts.${index}.account_id`}
                            label='Select Account'
                            error={
                              formErrors.linked_accounts?.[index]?.account_id
                                ?.message
                            }
                            //eslint-disable-next-line
                            options={userAccounts.map((acc: any) => ({
                              value: acc.account.id,
                              label: acc.account.name,
                            }))}
                          />
                        </div>
                        {goalPurpose !== 'repayment' && (
                          <div className='flex-1'>
                            <InputField
                              id={`linked_accounts.${index}.contribution_limit`}
                              name={`linked_accounts.${index}.contribution_limit`}
                              control={
                                control as unknown as Control<FieldValues>
                              }
                              error={
                                formErrors.linked_accounts?.[index]
                                  ?.contribution_limit?.message
                              }
                              label='Monthly Contribution Limit'
                              type='number'
                              labelPosition='outside'
                            />
                          </div>
                        )}
                        <button
                          type='button'
                          className='mt-8 text-red-500'
                          onClick={() => {
                            const currentAccounts = [...field.value];
                            currentAccounts.splice(index, 1);
                            setValue('linked_accounts', currentAccounts);
                          }}
                          // disabled={
                          //   goalPurpose === 'repayment' &&
                          //   field.value.length <= 1
                          // }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

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
    </>
  );
};

export default GoalModal;
