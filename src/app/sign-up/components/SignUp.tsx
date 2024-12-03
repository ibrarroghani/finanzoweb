'use client';
import React from 'react';
import { Control, useForm, FieldValues } from 'react-hook-form';
import AuthForm from '@/shared-components/auth/AuthForm';
import { signUpValidationSchema } from '../validations/sign-up-validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { increment, setUser } from '@/store/slices/sign-up-slice';
import { ISignUpFormData } from '../interfaces/sign-up-interface';
//import useSignUpAccount from '@/hooks/data-hooks/auth/use-sign-up-account';

const SignUp: React.FC = () => {
  const user = useSelector((state: RootState) => state.signUp.user);
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ISignUpFormData>({
    defaultValues: user,
    resolver: yupResolver(signUpValidationSchema),
  });

  // const {
  //   mutate: signUpAccount,
  //   isPending: isSignUpPending,
  //   error: isSignUpError,
  // } = useSignUpAccount();

  const handleSignUpSubmit = (data: ISignUpFormData) => {
    //eslint-disable-next-line no-console
    console.log('data', data);

    // const { firstName, lastName, email, password, confirmPassword } = data;
    // const newUser = {
    //   name: firstName + ' ' + lastName,
    //   email,
    //   password,
    //   confirmPassword,
    //   user_type: 'broker',
    // };
    // signUpAccount(newUser);

    dispatch(setUser(data));
    dispatch(increment());
  };

  const formFields = [
    {
      id: 'firstName',
      name: 'firstName',
      label: 'First Name',
      error: formErrors.firstName?.message,
    },
    {
      id: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      error: formErrors.lastName?.message,
    },
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      error: formErrors.email?.message,
    },
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
    formTitle: 'Sign Up',
    formDescription: 'Please enter your details below',
    formSubDescription: 'Or sign up with',
    fields: formFields,
    control: control as unknown as Control<FieldValues>,
    handleSubmit,
    onSubmit: handleSignUpSubmit,
    submitButtonText: 'Sign Up',
    additionalLink: {
      text: 'Already have an account?',
      href: '/login',
      linkText: 'Sign In',
    },
  };

  return <AuthForm {...authFormProps} />;
};

export default SignUp;

export const images = [
  { src: '/images/slide-image1.svg', alt: 'First slider image' },
  { src: '/images/slide-image1.svg', alt: 'Second slider image' },
  { src: '/images/slide-image1.svg', alt: 'Third slider image' },
  { src: '/images/slide-image1.svg', alt: 'Fourth slider image' },
];
