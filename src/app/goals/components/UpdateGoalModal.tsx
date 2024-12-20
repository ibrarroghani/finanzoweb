import CustomButton from '@/shared-components/CustomButton';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Radio, RadioChangeEvent } from 'antd';
import React from 'react';
import { useForm, Control, FieldValues } from 'react-hook-form';
import { goalCreateValidationSchema } from '../validations/goal-create-validation-schema';
// import useCreateGoal from '@/hooks/data-hooks/goal/use-create-goal';
import { convertDateApiFormat } from '@/utils/date-formatter';
import { useGoalPageContext } from '../context/GoalPageContext';
import useUpdateGoal from '@/hooks/data-hooks/goal/use-update-goal';
// import { useSingleGoal } from '@/hooks/dashboard/use-goals';

interface IUpdateGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

interface IUpdateGoalFormData {
  name: string;
  amount: string;
  // monthlyAmount: string;
  date: Date;
  status: 'active' | 'paused';
  //progress?: boolean;
}

const UpdateGoalModal: React.FC<IUpdateGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const { goalSlug } = useGoalPageContext();
  const initialValue: IUpdateGoalFormData = {
    name: '',
    amount: '',
    // monthlyAmount: '',
    date: new Date(0),
    status: 'active',
    //progress: false,
  };

  //   const { goal, isLoading } = useSingleGoal();

  const { mutate } = useUpdateGoal(goalSlug);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    //reset,
  } = useForm<IUpdateGoalFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(goalCreateValidationSchema),
  });

  // const handleSwitchButtonChange = (checked: boolean) => {
  //   setValue('progress', checked);
  // };

  const handleRadioButtonChange = (e: RadioChangeEvent) => {
    //console.log('e.target.value', e.target.value);
    setValue('status', e.target.value);
  };

  const handleGoalUpdate = (data: IUpdateGoalFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
    const formData = {
      title: data.name,
      description: 'this is a goal',
      goal_amount: Number(data.amount),
      target_date: convertDateApiFormat(data.date),
      goal_status: data.status,
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
        <form onSubmit={handleSubmit(handleGoalUpdate)}>
          <InputField
            id='name'
            name='name'
            control={control as unknown as Control<FieldValues>}
            error={formErrors.name?.message}
            label='Goal Name'
            labelPosition='outside'
          />
          <InputField
            id='amount'
            name='amount'
            control={control as unknown as Control<FieldValues>}
            error={formErrors.amount?.message}
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
            name='date'
            label='Target Date'
            error={formErrors.date?.message}
          />

          <div className='flex justify-between py-4'>
            {/* <p className='space-x-4'>
              <span className='font-light'>Progress Bar</span>
              <Switch onChange={handleSwitchButtonChange} />
            </p> */}
            <div className='ml-auto flex gap-4'>
              <p className='font-light'>Goal Status</p>
              <Radio.Group
                onChange={handleRadioButtonChange}
                defaultValue='active'
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
            </div>
          </div>
          <div className='ml-auto w-32'>
            <CustomButton type='submit' title='save changes' />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateGoalModal;
