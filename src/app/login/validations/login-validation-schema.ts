import { emailValidationRegex } from '@/utils/validation-regex';
import * as yup from 'yup';

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(emailValidationRegex, 'Invalid email format')
    .required('Email is required'),

  password: yup.string().trim().min(1).required('Password is required'),
});

export default loginValidationSchema;
