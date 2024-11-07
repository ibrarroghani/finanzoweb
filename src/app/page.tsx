'use client';
import InputField from '@/shared-components/InputField';
import SelectField from '@/shared-components/SelectField';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface formData {
  firstName?: string;
  lastName?: string;
}

const Home = () => {
  // Hydration check
  const [isMounted, setIsMounted] = useState(false);

  const initialValue: formData = {
    firstName: '',
    lastName: '',
  };

  const { control, handleSubmit } = useForm<formData>({
    defaultValues: initialValue,
  });

  const handleFormSubmit = (data: formData) => {
    console.log('data', data);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Return a loading state if not yet mounted
  if (!isMounted) {
    return <div>Loading...</div>;
  }
  return (
    <div className='h-screen bg-slate-300'>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='mx-6 flex gap-2'
      >
        <div className='w-1/2'>
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

        <button className='rounded-md bg-red-300 px-2' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
