'use client';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '@/app/login/components/AuthForm';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';
import { images } from './SignUp';
import { signUpOtpValidationSchema } from '../validations/sign-up-validation-schema';

interface IFormData {
  otp: string;
}

const SignUpOtp: React.FC = () => {
  //   const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormData>({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(signUpOtpValidationSchema),
  });

  const handleOtpSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);
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

  return (
    <AuthForm
      images={images}
      formTitle='OTP'
      formDescription='Please enter the OTP below'
      socialLoginButton={false}
      fields={formFields}
      control={control as unknown as Control<FieldValues>}
      handleSubmit={handleSubmit}
      onSubmit={handleOtpSubmit}
      submitButtonText='Send'
      additionalLink={{
        text: '',
        href: '#',
        linkText: 'ResendOTP',
      }}
    />
  );
};

export default SignUpOtp;
