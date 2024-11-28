'use client';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '@/app/login/components/AuthForm';

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    // resolver: yupResolver(testValidationSchema),
  });

  const handleSignUpSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
  };

  const formFields = [
    {
      id: 'firstName',
      name: 'firstName',
      label: 'First Name',
      error: formErrors.firstName?.message,
    },
    {
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      error: formErrors.lastName?.message,
    },
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
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      error: formErrors.confirmPassword?.message,
    },
  ];

  return (
    <AuthForm
      formTitle='Sign Up'
      formDescription='Please enter your details below'
      formSubDescription='Or sign up with'
      fields={formFields}
      control={control as unknown as Control<FieldValues>}
      handleSubmit={handleSubmit}
      onSubmit={handleSignUpSubmit}
      submitButtonText='Sign Up'
      additionalLink={{
        text: 'Already have an account?',
        href: '#',
        linkText: 'Sign In',
      }}
    />
  );
};

export default SignUp;
