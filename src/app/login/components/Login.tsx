'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '../../../shared-components/auth/AuthForm';
import loginValidationSchema from '../validations/login-validation-schema';
import { useRouter } from 'next/navigation';

interface IFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();

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
    router.push('/dashboard');
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

  const authFormProps = {
    images,
    formTitle: 'Sign In',
    formDescription: 'Please enter your details below',
    formSubDescription: 'Or sign in with',
    fields: formFields,
    control: control as unknown as Control<FieldValues>,
    handleSubmit,
    onSubmit: handleLoginSubmit,
    submitButtonText: 'Sign In',
    isForgetPassword: true,
    additionalLink: {
      // eslint-disable-next-line quotes
      text: `Don't have an account?`,
      href: '/sign-up',
      linkText: 'Sign Up',
    },
  };

  return <AuthForm {...authFormProps} />;
};

export default Login;
