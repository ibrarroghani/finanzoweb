'use client';
import DatePickerField from '@/shared-components/DatePickerField';
import InputField from '@/shared-components/InputField';
import SelectField from '@/shared-components/SelectField';
import TextareaField from '@/shared-components/TextareaField';
// import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface formData {
  firstName?: string;
  lastName?: string;
  details?: string;
  date?: Date | null;
}

const Home = () => {
  const initialValue: formData = {
    firstName: '',
    lastName: '',
    details: '',
    date: null,
  };

  const { control, handleSubmit } = useForm<formData>({
    defaultValues: initialValue,
  });

  const handleFormSubmit = (data: formData) => {
    console.log('data', data);
  };

  return (
    <div className='h-screen bg-slate-100'>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='mx-6 flex flex-col gap-2'
      >
        <div className='mt-2 w-1/2'>
          <InputField control={control} name='firstName' />
        </div>

        <div className='mt-2 w-1/2'>
          <SelectField
            control={control}
            name='lastName'
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled' },
            ]}
          />
        </div>

        <div className='w-1/2'>
          <TextareaField control={control} name='details' />
        </div>

        <div className='w-1/2'>
          <DatePickerField control={control} name='date' />
        </div>

        <div className='w-1/2'>
          <button
            className='rounded-md bg-red-300 px-2 text-white'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
