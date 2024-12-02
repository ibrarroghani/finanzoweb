'use client';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '@/shared-components/auth/AuthForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { images } from '@/app/sign-up/components/SignUp';
import { newPasswordValidationSchema } from '../validations/new-password-validation-schema';

interface IFormData {
  password: string;
  confirmPassword: string;
}

const NewPassword: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(newPasswordValidationSchema),
  });

  const handleNewPasswordSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
  };

  const formFields = [
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

  const authFormProps = {
    images,
    formTitle: 'New Password',
    formDescription: 'Please enter your new password below',
    socialLoginButton: false,
    fields: formFields,
    control: control as unknown as Control<FieldValues>,
    handleSubmit,
    onSubmit: handleNewPasswordSubmit,
    submitButtonText: 'Save',
  };

  return <AuthForm {...authFormProps} />;
};

export default NewPassword;
