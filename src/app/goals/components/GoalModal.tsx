import CustomButton from '@/shared-components/CustomButton';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Radio } from 'antd';
import React from 'react';
import { useForm, Control, FieldValues, Controller } from 'react-hook-form';
import { goalCreateValidationSchema } from '../validations/goal-create-validation-schema';
import useCreateGoal from '@/hooks/data-hooks/goal/use-create-goal';
import { convertDateApiFormat, getTomorrowDate } from '@/utils/date-formatter';

interface IGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

interface IGoalFormData {
  title: string;
  goal_amount: string;
  // monthlyAmount: string;
  target_date: Date;
  goal_status: 'active' | 'paused';
  //progress?: boolean;
}

const GoalModal: React.FC<IGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const initialValue: IGoalFormData = {
    title: '',
    goal_amount: '',
    // monthlyAmount: '',
    target_date: getTomorrowDate(),
    goal_status: 'active',
    //progress: false,
  };

  const { mutate, isPending } = useCreateGoal();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    //setValue,
  } = useForm<IGoalFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(goalCreateValidationSchema),
  });

  // const handleSwitchButtonChange = (checked: boolean) => {
  //   setValue('progress', checked);
  // };

  // const handleRadioButtonChange = (e: RadioChangeEvent) => {
  //   //console.log('e.target.value', e.target.value);
  //   setValue('goal_status', e.target.value);
  // };

  const handleGoalCreate = (data: IGoalFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
    const { title, goal_amount, target_date, goal_status } = data;
    const formData = {
      title,
      description: 'this is a goal',
      goal_amount: Number(goal_amount),
      target_date: convertDateApiFormat(target_date),
      goal_status,
    };
    mutate(formData);
    setShowModal();
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

          <div className='flex justify-between py-4'>
            {/* <p className='space-x-4'>
              <span className='font-light'>Progress Bar</span>
              <Switch onChange={handleSwitchButtonChange} />
            </p> */}
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
              {/* <Radio.Group
                onChange={handleRadioButtonChange}
                defaultValue={initialValue.goal_status}
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
              </Radio.Group> */}
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
