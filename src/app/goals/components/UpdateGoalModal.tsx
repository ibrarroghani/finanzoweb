import CustomButton from '@/shared-components/CustomButton';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm, Control, FieldValues, Controller } from 'react-hook-form';
import { goalCreateValidationSchema } from '../validations/goal-create-validation-schema';
import { convertDateApiFormat, getTomorrowDate } from '@/utils/date-formatter';
import { useGoalPageContext } from '../context/GoalPageContext';
import useUpdateGoal from '@/hooks/data-hooks/goal/use-update-goal';
import useGetSingleGoal from '@/hooks/data-hooks/goal/use-get-single-goal';
import Spinner from '@/shared-components/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import SelectField from '@/shared-components/SelectField';
import TextareaField from '@/shared-components/TextareaField';
import useGetBankAccounts from '@/hooks/data-hooks/account/use-get-bank-accounts';
import { IGoalFormData } from '@/app/goals/interface/goal-interface';

interface IUpdateGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

const INITIAL_GOAL_FORM_DATA: IGoalFormData = {
  title: '',
  goal_purpose: '',
  description: '',
  goal_amount: 0,
  target_date: getTomorrowDate(),
  goal_status: 'active',
  linked_accounts: [],
};

const UpdateGoalModal: React.FC<IUpdateGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const slug = useSelector((state: RootState) => state.auth.client.slug);
  const { goalSlug } = useGoalPageContext();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    watch,
    setValue,
  } = useForm<IGoalFormData>({
    defaultValues: INITIAL_GOAL_FORM_DATA,
    resolver: yupResolver(goalCreateValidationSchema),
  });

  const goalPurpose = watch('goal_purpose');
  const linkedAccounts = watch('linked_accounts');

  const { data: goalData, isLoading: isGoalLoading } = useGetSingleGoal(
    slug,
    goalSlug
  );
  const { mutate: updateGoal, isPending } = useUpdateGoal(slug, goalSlug);
  const { data: bankAccounts, isLoading: isBankAccountsLoading } =
    useGetBankAccounts(slug, {
      force_initial_plaid_account_fetch: 'yes',
    });

  const handleGoalUpdate = (data: IGoalFormData) => {
    const formData = {
      ...data,
      goal_amount: Number(data.goal_amount),
      target_date: convertDateApiFormat(data.target_date),
      goal_status: data.goal_status,
      linked_accounts: data.linked_accounts.map((account) => ({
        account_id: account.account_id,
        contribution_limit: Number(account.contribution_limit),
      })),
    };

    updateGoal(formData, {
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

  useEffect(() => {
    if (goalData?.data?.goal) {
      const { goal } = goalData.data;
      reset({
        title: goal.title || '',
        goal_purpose: goal.goal_purpose || '',
        description: goal.description || '',
        goal_amount: goal.goal_amount || '',
        target_date: goal.target_date || getTomorrowDate(),
        goal_status: goal.goal_status || 'active',
        linked_accounts: goal.linked_accounts || [],
      });
    }
  }, [goalData, reset]);

  return (
    <>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <div className='flex min-h-[350px] flex-col'>
          {isGoalLoading ? (
            <div className='flex flex-1 items-center justify-center'>
              <Spinner />
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleGoalUpdate)} className='flex-1'>
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
              {/* <InputField
            id='monthlyAmount'
            name='monthlyAmount'
            control={control as unknown as Control<FieldValues>}
            error={formErrors.monthlyAmount?.message}
            label='Monthly Contributions'
            type='number'
            labelPosition='outside'
          /> */}

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
                        isGoalLoading ||
                        isBankAccountsLoading
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
                                control={
                                  control as unknown as Control<FieldValues>
                                }
                                name={`linked_accounts.${index}.account_id`}
                                label='Select Account'
                                error={
                                  formErrors.linked_accounts?.[index]
                                    ?.account_id?.message
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
                      <Radio.Group
                        {...field}
                        buttonStyle='solid'
                        className='flex'
                      >
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
                  title='update goal'
                  disable={isPending}
                />
              </div>
            </form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UpdateGoalModal;
