import { emailValidationRegex } from '@/utils/validation-regex';
import * as yup from 'yup';

export const signUpValidationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, 'First Name is required and must be at least 2 characters long')
    .required(),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Last Name is required and must be at least 2 characters long')
    .required(),
  email: yup
    .string()
    .trim()
    .matches(emailValidationRegex, 'Invalid email format')
    .required('Email is required'),

  password: yup.string().trim().min(1).required('Password is required'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], 'Passwords not match')
    .required('Confirm Password is required'),
});

export const signUpOtpValidationSchema = yup.object({
  otp: yup.string().trim().min(6, 'OTP is required').required(),
});
