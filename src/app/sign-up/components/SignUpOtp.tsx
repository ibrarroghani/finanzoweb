'use client';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '@/shared-components/auth/AuthForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { images } from './SignUp';
import { otpValidationSchema } from '../validations/sign-up-validation-schema';
import { decrement } from '@/store/slices/sign-up-slice';
import { IOtpFormData } from '@/interfaces/otp-interface';

const SignUpOtp: React.FC = () => {
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

export default SignUpOtp;
