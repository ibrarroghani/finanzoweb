'use client';
import React from 'react';
import { notification, Radio } from 'antd';
import {
  Control,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
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
import { DollarIcon } from '@/assets/icons/bussiness-panel-icons';

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
  isLoading,
  isPending,
}) => {
  const handleSubmit = () => {
    if (linkedAccounts.length === 0) {
      notification.error({
        message: 'No linked accounts found. Please link an account.',
      });
    }
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
        placeholder='Enter goal title'
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
        placeholder='Select goal purpose'
      />
      <TextareaField
        label='Goal Description'
        control={control}
        name='description'
        error={formErrors.description?.message}
        rows={3}
        placeholder='Enter goal description'
      />
      <InputField
        id='goal_amount'
        name='goal_amount'
        control={control}
        error={formErrors.goal_amount?.message}
        label='Target Amount'
        type='number'
        icon={<DollarIcon />}
        placeholder='Enter target amount'
      />
      <DatePickerField
        control={control}
        name='target_date'
        label='Target Date'
        error={formErrors.target_date?.message}
        placeholder='YYYY-MM-DD'
      />
      <div className='my-2 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
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
        <div className='ml-auto w-32'>
          <CustomButton
            className='btn-gradient'
            type='button'
            title='Link Account'
            onClick={handleAddAccount}
            disable={
              !goalPurpose ||
              (goalPurpose === 'repayment' && linkedAccounts.length >= 1) ||
              isLoading
            }
          />
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

      <div className='ml-auto mt-2 w-32'>
        <CustomButton
          onClick={handleSubmit}
          type='button'
          title='save changes'
          disable={isPending}
          className='btn-gradient'
        />
      </div>
    </form>
  );
};

export default GoalForm;
