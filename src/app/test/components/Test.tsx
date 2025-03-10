'use client';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import SelectField from '@/shared-components/SelectField';
import TextareaField from '@/shared-components/TextareaField';
import { useForm, Control, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomButton from '@/shared-components/CustomButton';
import DoughnutChart from '@/shared-components/chart/DoughnutChart';
// import LineChart from '@/shared-components/chart/LineChart';
// import useGetGoalChart from '@/hooks/data-hooks/goal/use-get-goal-chart';
// import { useEffect, useState } from 'react';
// import { format } from 'date-fns';

const testValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(1, 'First Name is required and must be at least 1 characters long')
    .required(),
  lastName: yup
    .string()
    .trim()
    .min(1, 'Last Name is required and must be at least 1 characters long')
    .required(),
  details: yup
    .string()
    .trim()
    .min(1, 'Details is required and must be at least 1 characters long')
    .required(),
  date: yup
    .date()
    .nullable()
    .default(null)
    .required('Date is required')
    .test(
      'not-epoch',
      'Date is required',
      (value) => value?.getTime() !== new Date(0).getTime()
    ), // Custom validation to check for new Date(0)
});

interface IFormData {
  firstName: string;
  lastName: string;
  details: string;
  date: Date;
}

// interface IGoalChart {
//   data: IGoalChartData[];
// }
// interface IGoalChartData {
//   id: number;
//   label: string;
//   value: string;
// }

// const formatDateLabel = (dateString: string): string => {
//   const date = new Date(dateString);
//   return format(date, 'dd MMM yy');
// };

const Test = () => {
  const initialValue: IFormData = {
    firstName: '',
    lastName: '',
    details: '',
    date: new Date(0),
  };

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(testValidationSchema),
  });

  // const [labels, setLabels] = useState<string[]>([]);
  // const [values, setValues] = useState<number[]>([]);

  // const { mutate: getGoalChart } = useGetGoalChart();

  // useEffect(() => {
  //   getGoalChart(
  //     {
  //       dataPoint: 5,
  //     },
  //     {
  //       onSuccess: (response) => {
  //         if (response.data.length > 0) {
  //           const newLabels = response.data.map((item: IGoalChartData) =>
  //             formatDateLabel(item.label)
  //           );
  //           const newValues = response.data.map((item: IGoalChartData) =>
  //             Number(item.value)
  //           );

  //           setLabels(newLabels);
  //           setValues(newValues);
  //         }
  //       },
  //     }
  //   );
  // }, [getGoalChart]);

  const handleFormSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
  };

  return (
    <div className='flex h-screen flex-col justify-center overflow-hidden overflow-y-auto bg-primary-light'>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='mx-6 flex w-full flex-col items-center justify-center gap-2'
      >
        <div className='w-1/3'>
          <InputField
            id='firstName'
            name='firstName'
            control={control as unknown as Control<FieldValues>}
            error={formErrors.firstName?.message}
            label='Email'
          />
        </div>

        <div className='mt-4 w-1/3'>
          <SelectField
            control={control as unknown as Control<FieldValues>}
            name='lastName'
            error={formErrors.lastName?.message}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled' },
            ]}
          />
        </div>

        <div className='mt-4 w-1/3'>
          <TextareaField
            control={control as unknown as Control<FieldValues>}
            name='details'
            error={formErrors.details?.message}
          />
        </div>

        <div className='mt-4 w-1/3'>
          <DatePickerField
            control={control as unknown as Control<FieldValues>}
            name='date'
            error={formErrors.date?.message}
          />
        </div>

        <div className='mt-4 flex w-1/3 justify-center'>
          <CustomButton title='submit' />
        </div>
      </form>

      <div className='w-32'>
        <DoughnutChart
          data={[80, 20]}
          backgroundColor={['#3fa75a', '#34A8531A']}
        />
      </div>

      {/* <div className='p-4'>
        <LineChart labels={labels} data={values} />
      </div> */}
    </div>
  );
};

export default Test;
