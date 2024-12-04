'use client';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import SelectField from '@/shared-components/SelectField';
import TextareaField from '@/shared-components/TextareaField';
import { useForm, Control, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomButton from '@/shared-components/CustomButton';

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

  const handleFormSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
  };

  return (
    <div className='flex h-screen justify-center bg-white'>
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
    </div>
  );
};

export default Test;
