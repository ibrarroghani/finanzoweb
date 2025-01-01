import CustomButton from '@/shared-components/CustomButton';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Radio } from 'antd';
import React, { useEffect } from 'react';
import { useForm, Control, FieldValues, Controller } from 'react-hook-form';
import { goalCreateValidationSchema } from '../validations/goal-create-validation-schema';
import { convertDateApiFormat, getTomorrowDate } from '@/utils/date-formatter';
import { useGoalPageContext } from '../context/GoalPageContext';
import useUpdateGoal from '@/hooks/data-hooks/goal/use-update-goal';
import useGetSingleGoal from '@/hooks/data-hooks/goal/use-get-single-goal';
import Spinner from '@/shared-components/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface IUpdateGoalModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

interface IUpdateGoalFormData {
  title: string;
  goal_amount: string;
  // monthlyAmount: string;
  target_date: Date;
  goal_status: 'active' | 'paused';
  //progress?: boolean;
}

const UpdateGoalModal: React.FC<IUpdateGoalModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const slug = useSelector((state: RootState) => state.auth.client.slug);
  const { goalSlug } = useGoalPageContext();
  const initialValue: IUpdateGoalFormData = {
    title: '',
    goal_amount: '',
    // monthlyAmount: '',
    target_date: getTomorrowDate(),
    goal_status: 'active',
    //progress: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    // setValue,
    reset,
  } = useForm<IUpdateGoalFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(goalCreateValidationSchema),
  });

  const { data, isLoading } = useGetSingleGoal(slug, goalSlug);
  const { mutate: updateGoal, isPending } = useUpdateGoal(slug, goalSlug);

  const handleGoalUpdate = (data: IUpdateGoalFormData) => {
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
    updateGoal(formData, {
      onSuccess: () => {
        setShowModal();
      },
    });
  };

  useEffect(() => {
    if (data?.data) {
      const { title, goal_amount, target_date, goal_status } = data.data.goal;
      reset({
        title: title || '',
        goal_amount: goal_amount || '',
        target_date: target_date || getTomorrowDate(),
        goal_status: goal_status || 'active',
      });
    }
  }, [data, reset]);

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
          {isLoading ? (
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
                  title='save changes'
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
