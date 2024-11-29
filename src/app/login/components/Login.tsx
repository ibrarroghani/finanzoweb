'use client';
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

  const images = [
    { src: '/images/slide-image1.svg', alt: 'First slider image' },
    { src: '/images/slide-image1.svg', alt: 'Second slider image' },
    { src: '/images/slide-image1.svg', alt: 'Third slider image' },
    { src: '/images/slide-image1.svg', alt: 'Fourth slider image' },
  ];

  return (
    <AuthForm
      images={images}
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
        href: '/sign-up',
        linkText: 'Sign Up',
      }}
    />
  );
};

export default Login;
