'use client';
import React from 'react';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import CustomButton from '@/shared-components/CustomButton';
import { useForm, Control, FieldValues } from 'react-hook-form';
import InputField from '@/shared-components/InputField';
import DatePickerField from '@/shared-components/DatePickerField';
import SelectField from '@/shared-components/SelectField';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingValidationSchema } from '../validations/setting-validation-schema';

interface ISettingFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  phone: string;
  licenseKey: string;
}

const Setting = () => {
  const initialValue: ISettingFormData = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(0),
    gender: '',
    email: '',
    phone: '',
    licenseKey: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
    //setValue,
  } = useForm<ISettingFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(settingValidationSchema),
  });

  const handleUpdateProfile = (data: ISettingFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
  };

  return (
    <div className='p-4'>
      <ClientDetailsCard />
      <div className='mt-6 flex justify-between'>
        <p className='text-18 font-semibold capitalize'>settings</p>
        <div className='w-40'>
          <CustomButton
            onClick={handleSubmit(handleUpdateProfile)}
            title='save changes'
          />
        </div>
      </div>

      <div className='mt-6 flex flex-col gap-2 md:flex-row md:items-start'>
        <div className='md:flex-1'>
          <div className='rounded-5 bg-primary-light p-4'>
            <p>Personal Information</p>
            <div className='md:flex md:gap-2'>
              <div className='md:w-1/2'>
                <InputField
                  id='firstName'
                  name='firstName'
                  control={control as unknown as Control<FieldValues>}
                  error={formErrors.firstName?.message}
                  label='First Name'
                  labelPosition='outside'
                />
              </div>

              <div className='md:w-1/2'>
                <InputField
                  id='lastName'
                  name='lastName'
                  control={control as unknown as Control<FieldValues>}
                  error={formErrors.lastName?.message}
                  label='Last Name'
                  labelPosition='outside'
                />
              </div>
            </div>

            <DatePickerField
              control={control as unknown as Control<FieldValues>}
              name='dateOfBirth'
              label='Date of Birth'
              error={formErrors.dateOfBirth?.message}
            />

            <SelectField
              control={control as unknown as Control<FieldValues>}
              name='gender'
              label='Gender'
              error={formErrors.gender?.message}
              value='none'
              options={[
                { value: 'none', label: 'None' },
                { value: 'male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'disabled', label: 'Others' },
              ]}
            />
          </div>
          <div className='mt-4 rounded-5 bg-primary-light p-4'>
            <p>Contact Details</p>
            <InputField
              id='email'
              name='email'
              control={control as unknown as Control<FieldValues>}
              error={formErrors.email?.message}
              label='Email'
              labelPosition='outside'
            />

            <InputField
              id='phone'
              name='phone'
              control={control as unknown as Control<FieldValues>}
              error={formErrors.phone?.message}
              label='Phone'
              labelPosition='outside'
            />
          </div>
        </div>
        <div className='rounded-5 bg-primary-light p-4'>
          <p className='capitalize'>broker license information</p>
          <InputField
            id='licenseKey'
            name='licenseKey'
            control={control as unknown as Control<FieldValues>}
            error={formErrors.licenseKey?.message}
            label='License Key'
            labelPosition='outside'
          />
        </div>
      </div>
    </div>
  );
};

export default Setting;
