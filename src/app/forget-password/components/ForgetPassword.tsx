'use client';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '@/shared-components/auth/AuthForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { images } from '@/app/sign-up/components/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { increment, setEmail } from '@/store/slices/forget-password-slice';
import { forgetPasswordValidationSchema } from '../validations/forget-password-validation-schema';

interface IFormData {
  email: string;
}

const ForgetPassword: React.FC = () => {
  const email = useSelector((state: RootState) => state.forgetPassword.email);
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormData>({
    defaultValues: {
      email: email,
    },
    resolver: yupResolver(forgetPasswordValidationSchema),
  });

  const handleForgetPasswordSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
    dispatch(setEmail(data));
    dispatch(increment());
  };

  const formFields = [
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      error: formErrors.email?.message,
    },
  ];

  const authFormProps = {
    images,
    formTitle: 'Forget Password',
    formDescription: 'Please enter your email below',
    socialLoginButton: false,
    fields: formFields,
    control: control as unknown as Control<FieldValues>,
    handleSubmit,
    onSubmit: handleForgetPasswordSubmit,
    submitButtonText: 'Next',
  };

  return <AuthForm {...authFormProps} />;
};

export default ForgetPassword;
