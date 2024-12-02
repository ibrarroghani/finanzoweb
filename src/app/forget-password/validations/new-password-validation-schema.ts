import * as yup from 'yup';
export const newPasswordValidationSchema = yup.object({
  password: yup.string().trim().min(1).required('Password is required'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], 'Passwords not match')
    .required('Confirm Password is required'),
});
