'use client';
// import { AppleIcon, GoogleIcon } from '@/assets/icons/bussiness-panel-icons';
// import CustomButton from '@/shared-components/CustomButton';
// import InputField from '@/shared-components/InputField';
// import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from './AuthForm';
import loginValidationSchema from '../validations/login-validation-schema';

interface IFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormData>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginValidationSchema),
  });

  const handleLoginSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
  };

  const formFields = [
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      error: formErrors.email?.message,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      error: formErrors.password?.message,
    },
  ];

  return (
    // <div className='flex h-screen bg-[#202020]'>
    //   <div className='hidden w-1/2 md:flex'></div>
    //   <div className='flex w-full flex-col items-center justify-center rounded-l-3xl bg-white md:w-1/2'>
    //     <h6 className='text-xl font-bold text-[#202020]'>Sign In</h6>
    //     <p className='mt-5 text-sm capitalize'>
    //       Please enter your details below
    //     </p>

    //     <div className='mt-5 flex w-full items-center justify-center gap-3'>
    //       <div className='w-24 border-b border-b-[#eeeeee]'></div>
    //       <p className='text-sm'>Or sign in with</p>
    //       <div className='w-24 border-b border-b-[#eeeeee]'></div>
    //     </div>

    //     <div className='mt-6 flex w-1/2 items-center justify-center gap-2'>
    //       <div className='w-1/2'>
    //         <CustomButton title='google' icon={<GoogleIcon />} />
    //       </div>
    //       <div className='w-1/2'>
    //         <CustomButton title='apple' icon={<AppleIcon />} />
    //       </div>
    //     </div>

    //     <form
    //       className='my-5 flex w-full flex-col items-center justify-center'
    //       onSubmit={handleSubmit(handleFormSubmit)}
    //     >
    //       <div className='w-1/2'>
    //         <InputField
    //           id='email'
    //           name='email'
    //           control={control as unknown as Control<FieldValues>}
    //           error={formErrors.email?.message}
    //           label='Email'
    //         />
    //       </div>
    //       <div className='w-1/2'>
    //         <InputField
    //           id='password'
    //           name='password'
    //           type='password'
    //           control={control as unknown as Control<FieldValues>}
    //           error={formErrors.email?.message}
    //           label='Password'
    //         />
    //       </div>

    //       <div className='mt-4 w-1/2'>
    //         <CustomButton title='submit' type='submit' />
    //       </div>
    //     </form>

    //     <div className='flex items-center justify-center'>
    //       <p>don&apos;t You Have an Account?</p>
    //       <Link href='#' className='text-sm font-bold'>
    //         Sign Up
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <AuthForm
      formTitle='Sign In'
      formDescription='Please enter your details below'
      formSubDescription='Or sign in with'
      fields={formFields}
      control={control as unknown as Control<FieldValues>}
      handleSubmit={handleSubmit}
      onSubmit={handleLoginSubmit}
      submitButtonText='Sign In'
      additionalLink={{
        // eslint-disable-next-line quotes
        text: `Don't have an account?`,
        href: '#',
        linkText: 'Sign Up',
      }}
    />
  );
};

export default Login;
