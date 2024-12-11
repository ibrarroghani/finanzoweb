import {
  emailValidationRegex,
  phoneValidationRegex,
} from '@/utils/validation-regex';
import * as yup from 'yup';

export const settingValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, 'First Name is required and at least 2 characters long')
    .required(),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Last Name is required and at least 2 characters long')
    .required(),

  dateOfBirth: yup
    .date()
    .nullable()
    .default(null)
    .required('Date is required')
    .test(
      'not-epoch',
      'Date is required',
      (value) => value?.getTime() !== new Date(0).getTime()
    ),

  gender: yup.string().trim().min(1, 'Gender is required').required(),

  email: yup
    .string()
    .trim()
    .matches(emailValidationRegex, 'Invalid email format')
    .required('Email is required'),

  phone: yup
    .string()
    .trim()
    .matches(phoneValidationRegex, 'Invalid phone number format')
    .min(1, 'Phone number is required and at least 1 character long')
    .required(),

  licenseKey: yup.string().trim().min(2, 'License Key is required').required(),
});
