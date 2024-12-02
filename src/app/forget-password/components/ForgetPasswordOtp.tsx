'use client';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '@/shared-components/auth/AuthForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { IOtpFormData } from '@/interfaces/otp-interface';
import { decrement, increment } from '@/store/slices/forget-password-slice';
import { images } from '@/app/sign-up/components/SignUp';
import { otpValidationSchema } from '@/app/sign-up/validations/sign-up-validation-schema';

const ForgetPasswordOtp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IOtpFormData>({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(otpValidationSchema),
  });

  const handleOtpSubmit = (data: IOtpFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
    dispatch(increment());
  };

  const handleBackButton = () => {
    dispatch(decrement());
  };

  const formFields = [
    {
      id: 'otp',
      name: 'otp',
      label: 'OTP',
      type: 'number',
      error: formErrors.otp?.message,
    },
  ];

  const authFormProps = {
    images,
    formTitle: 'OTP',
    formDescription: 'Please enter the OTP below',
    socialLoginButton: false,
    fields: formFields,
    control: control as unknown as Control<FieldValues>,
    handleSubmit,
    onSubmit: handleOtpSubmit,
    handleBackButton,
    backButtonText: 'Back',
    submitButtonText: 'Send',
    additionalLink: {
      text: '',
      href: '#',
      linkText: 'ResendOTP',
    },
  };

  return <AuthForm {...authFormProps} />;
};

export default ForgetPasswordOtp;
