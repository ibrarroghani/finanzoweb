import React from 'react';
import { Control, FieldValues } from 'react-hook-form';
import CustomButton from '@/shared-components/CustomButton';
// import InputField from '@/shared-components/InputField';
// import Link from 'next/link';
import ImageSlider from '@/shared-components/ImageSlider';
// import { Checkbox } from 'antd';
import { loginWithB2C, signupWithB2C } from './authService';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, IUser } from '@/store/slices/auth-slice';
import { API_PREFIX } from '@/config/api/constrants';

interface IFormField {
  id: string;
  name: string;
  type?: string;
  label: string;
  error?: string;
}

interface AccountInfo {
  username: string;
  idTokenClaims?: Record<string, unknown>;
  idToken?: string;
}

interface IAuthFormProps {
  images: { src: string; alt: string }[];
  formTitle: string;
  formDescription: string;
  formSubDescription?: string;
  fields: IFormField[];
  control: Control<FieldValues>;
  // handleSubmit: UseFormHandleSubmit<any>;
  // onSubmit: (data: any) => void;
  handleBackButton?: () => void;
  isForgetPassword?: boolean;
  backButtonText?: string;
  submitButtonText: string;
  additionalLink?: { text: string; href: string; linkText: string };
}

const AuthForm: React.FC<IAuthFormProps> = ({
  images,
  formTitle,
  formDescription,
  formSubDescription,
  // fields,
  // control,
  // handleSubmit,
  // onSubmit,
  // handleBackButton,
  // isForgetPassword,
  // backButtonText,
  // submitButtonText,
  // additionalLink,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleAuthSuccess = (accountInfo: AccountInfo) => {
    if (!accountInfo) {
      dispatch(loginFailure());
      return;
    }
    const token = accountInfo?.idToken;
    localStorage.setItem('dummyAuthToken', token ?? '');
    const claims = accountInfo.idTokenClaims as {
      given_name?: string;
      family_name?: string;
    };

    const user: IUser = {
      name: `${claims?.given_name ?? ''} ${claims?.family_name ?? ''}`.trim(),
      email: accountInfo.username ?? '',
      user_type: 'client',
      slug: '',
    };

    dispatch(loginSuccess(user));
    router.push('/dashboard');
  };

  // const handleMicrosoftLogin = async () => {
  //   const accountInfo = await loginWithMicrosoft();
  //   if (accountInfo) {
  //     handleAuthSuccess(accountInfo);
  //   } else {
  //     dispatch(loginFailure());
  //   }
  // };

  const handleAzureAdB2Clogin = async () => {
    const accountInfo = await loginWithB2C();
    if (accountInfo) {
      handleAuthSuccess(accountInfo);
    } else {
      dispatch(loginFailure());
    }
  };

  const handleB2CSignup = async () => {
    try {
      const accountInfo = await signupWithB2C();
      if (accountInfo) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${API_PREFIX}/auth/sign-up`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: {
                email: accountInfo?.username,
                name:
                  accountInfo?.idTokenClaims?.given_name +
                  ' ' +
                  accountInfo?.idTokenClaims?.family_name,
              },
            }),
          }
        );
        handleAuthSuccess(accountInfo);
      }
    } catch (error) {
      dispatch(loginFailure());
      console.error('B2C Signup Error:', error);
    }
  };

  return (
    <div className='flex min-h-screen bg-primary-dark'>
      <AuthImageSlider images={images} />
      <div className='flex w-full flex-col items-center bg-primary-light px-10 pt-4 md:w-1/2 md:rounded-l-3xl md:px-0'>
        <div className='flex w-full flex-1 flex-col justify-center'>
          <FormHeader
            title={formTitle}
            description={formDescription}
            subDescription={formSubDescription}
          />
          <div className='my-2 flex w-full items-center justify-center gap-2'>
            <div className='w-1/2 md:w-1/4'>
              <CustomButton title='Sign In' onClick={handleAzureAdB2Clogin} />
            </div>
            <div className='w-1/2 md:w-1/4'>
              <CustomButton title='Sign Up' onClick={handleB2CSignup} />
            </div>
          </div>

          {/* Uncomment and modify form if needed */}
          {/* <form
            className='flex w-full flex-col items-center justify-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            {fields.map((field) => (
              <InputFieldWrapper
                key={field.id}
                field={field}
                control={control}
              />
            ))}

            {isForgetPassword && <RememberMe />}

            <div className='mt-2 w-full md:w-1/2'>
              <CustomButton title={submitButtonText} type='submit' />
            </div>
            <div>
              <div className='mt-2 w-full'>
                <CustomButton
                  title='Sign In Using Entra ID'
                  onClick={handleMicrosoftLogin}
                />
              </div>
              <div className='mt-2 w-full'>
                <CustomButton
                  title='Sign In Using Azure AD B2C'
                  onClick={handleAzureAdB2Clogin}
                />
              </div>
              <div className='mt-2 w-full'>
                <CustomButton
                  title='Sign Up Using Azure AD B2C'
                  onClick={handleB2CSignup}
                />
              </div>
            </div>

            {handleBackButton && backButtonText && (
              <div className='my-2 w-full md:w-1/2'>
                <CustomButton
                  onClick={handleBackButton}
                  title={backButtonText}
                  type='button'
                />
              </div>
            )}
          </form> */}

          {/* Uncomment and modify additional link section if needed */}
          {/* {additionalLink && <AdditionalLink {...additionalLink} />} */}
        </div>

        <p className='text-small m-10 mb-2 capitalize'>
          &copy; 2024 Finanzo. crafted by finanzo
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

const AuthImageSlider: React.FC<{ images: { src: string; alt: string }[] }> = ({
  images,
}) => (
  <div className='hidden md:flex md:w-1/2'>
    <div className='w-full'>
      <ImageSlider images={images} />
    </div>
  </div>
);

const FormHeader: React.FC<{
  title: string;
  description: string;
  subDescription?: string;
}> = ({ subDescription }) => (
  <div className='flex flex-col items-center justify-center'>
    <h6 className='text-extra-large font-black text-primary-dark'>
      Welcome to Finanzo
    </h6>
    {/* <p className='text-small mt-2 capitalize'>{description}</p> */}
    {subDescription && (
      <div className='mt-2 flex items-center gap-3'>
        <div className='w-24 border-b border-b-border-primary' />
        <p className='text-small capitalize'>Please sign in to continue or create a new account.</p>
        <div className='w-24 border-b border-b-border-primary' />
      </div>
    )}
  </div>
);
