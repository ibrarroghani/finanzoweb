'use client';
import React from 'react';
import { Radio } from 'antd';
import {
  Control,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  Controller,
} from 'react-hook-form';
import InputField from '@/shared-components/InputField';
import SelectField from '@/shared-components/SelectField';
import TextareaField from '@/shared-components/TextareaField';
import DatePickerField from '@/shared-components/DatePickerField';
import CustomButton from '@/shared-components/CustomButton';
import {
  IUserAccounts,
  IGoalFormData,
  ILinkedAccount,
} from '@/app/goals/interface/goal-interface';
import SelectedAccounts from './SelectedAccounts';

interface GoalFormProps {
  control: Control<FieldValues>;
  formErrors: FieldErrors<IGoalFormData>;
  onSubmit: () => void;
  //eslint-disable-next-line
  setShowAccountSelectionModal: (value: boolean) => void;
  onAddAccountClick?: () => void;
  goalPurpose: string;
  linkedAccounts: ILinkedAccount[];
  userAccounts: IUserAccounts[];
  setValue: UseFormSetValue<IGoalFormData>;
  watch: UseFormWatch<IGoalFormData>;
  isLoading: boolean;
  isPending: boolean;
}

const GoalForm: React.FC<GoalFormProps> = ({
  control,
  formErrors,
  onSubmit, // Use this function for form submission
  onAddAccountClick,
  setShowAccountSelectionModal,
  goalPurpose,
  linkedAccounts,
  userAccounts,
  setValue,
  watch,
  isLoading,
  isPending,
}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleAddAccount = () => {
    if (onAddAccountClick) onAddAccountClick();
    setShowAccountSelectionModal(true);
  };

  return (
    <form>
      <InputField
        id='title'
        name='title'
        control={control}
        error={formErrors.title?.message}
        label='Goal Title'
        labelPosition='outside'
      />
      <SelectField
        control={control}
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
        control={control}
        name='description'
        error={formErrors.description?.message}
        rows={3}
      />
      <InputField
        id='goal_amount'
        name='goal_amount'
        control={control}
        error={formErrors.goal_amount?.message}
        label='Target Amount'
        type='number'
        labelPosition='outside'
      />
      <DatePickerField
        control={control}
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
              onClick={handleAddAccount}
              disable={
                !goalPurpose ||
                (goalPurpose === 'repayment' && linkedAccounts.length >= 1) ||
                isLoading
              }
            />
          </div>
        </div>
      </div>
      {/* Preview Section */}
      {linkedAccounts.length > 0 && (
        <SelectedAccounts
          linkedAccounts={linkedAccounts}
          userAccounts={userAccounts}
          goalPurpose={goalPurpose}
          setValue={setValue}
        />
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
          onClick={handleSubmit}
          type='button'
          title='save changes'
          disable={isPending}
        />
      </div>
    </form>
  );
};

export default GoalForm;
