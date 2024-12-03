import React from 'react';
import { Control, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import CustomButton from '@/shared-components/CustomButton';
import InputField from '@/shared-components/InputField';
import Link from 'next/link';
import { AppleIcon, GoogleIcon } from '@/assets/icons/bussiness-panel-icons';
import ImageSlider from '@/shared-components/ImageSlider';
import { Checkbox } from 'antd';

interface IFormField {
  id: string;
  name: string;
  type?: string;
  label: string;
  error?: string;
}

interface IAuthFormProps {
  images: { src: string; alt: string }[];
  formTitle: string;
  formDescription: string;
  formSubDescription?: string;
  socialLoginButton?: boolean;
  fields: IFormField[];
  control: Control<FieldValues>;
  //eslint-disable-next-line
  handleSubmit: UseFormHandleSubmit<any>;
  //eslint-disable-next-line
  onSubmit: (data: any) => void;
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
  socialLoginButton = true,
  fields,
  control,
  handleSubmit,
  onSubmit,
  handleBackButton,
  isForgetPassword,
  backButtonText,
  submitButtonText,
  additionalLink,
}) => {
  return (
    <div className='flex min-h-screen bg-[#202020]'>
      <AuthImageSlider images={images} />
      <div className='flex w-full flex-col items-center bg-white pt-6 md:w-1/2 md:rounded-l-3xl'>
        <div className='flex w-full flex-1 flex-col justify-center'>
          <FormHeader
            title={formTitle}
            description={formDescription}
            subDescription={formSubDescription}
          />

          {socialLoginButton && <SocialLoginButtons />}
          <form
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

            {handleBackButton && backButtonText && (
              <div className='my-2 w-full md:w-1/2'>
                <CustomButton
                  onClick={handleBackButton}
                  title={backButtonText}
                  type='button'
                />
              </div>
            )}
          </form>

          {additionalLink && <AdditionalLink {...additionalLink} />}
        </div>

        <p className='mt-10 text-sm capitalize md:mb-2'>
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
}> = ({ title, description, subDescription }) => (
  <div className='flex flex-col items-center justify-center'>
    <h6 className='text-xl font-bold text-[#202020]'>{title}</h6>
    <p className='mt-2 text-sm capitalize'>{description}</p>
    {subDescription && (
      <div className='mt-2 flex items-center gap-3'>
        <div className='w-24 border-b border-b-[#eeeeee]' />
        <p className='text-sm capitalize'>{subDescription}</p>
        <div className='w-24 border-b border-b-[#eeeeee]' />
      </div>
    )}
  </div>
);

const SocialLoginButtons: React.FC = () => (
  <div className='my-2 flex w-full items-center justify-center gap-2'>
    <div className='w-1/2 md:w-1/4'>
      <CustomButton title='Google' icon={<GoogleIcon />} />
    </div>
    <div className='w-1/2 md:w-1/4'>
      <CustomButton title='Apple' icon={<AppleIcon />} />
    </div>
  </div>
);

const InputFieldWrapper: React.FC<{
  field: IFormField;
  control: Control<FieldValues>;
}> = ({ field, control }) => (
  <div className='w-full md:w-1/2'>
    <InputField {...field} control={control} />
  </div>
);

const RememberMe: React.FC = () => (
  <div className='my-2 flex w-full justify-between md:w-1/2'>
    <p>
      <Checkbox />
      <span className='ml-2'>Remember Me</span>
    </p>
    <Link href='/forget-password'>Forget Password?</Link>
  </div>
);

const AdditionalLink: React.FC<{
  text: string;
  href: string;
  linkText: string;
}> = ({ text, href, linkText }) => (
  <div className='mt-2 flex items-center justify-center'>
    <p className='text-sm capitalize'>{text}</p>
    <Link href={href} className='text-sm font-bold'>
      {linkText}
    </Link>
  </div>
);
