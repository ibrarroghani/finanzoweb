import { emailValidationRegex } from '@/utils/validation-regex';
import * as yup from 'yup';

export const forgetPasswordValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(emailValidationRegex, 'Invalid email format')
    .required('Email is required'),
});
