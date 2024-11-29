import React from 'react';
import { Control, FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import CustomButton from '@/shared-components/CustomButton';
import InputField from '@/shared-components/InputField';
import Link from 'next/link';
import { AppleIcon, GoogleIcon } from '@/assets/icons/bussiness-panel-icons';
import ImageSlider from '@/shared-components/ImageSlider';

interface IAuthFormProps {
  images: { src: string; alt: string }[];
  formTitle: string;
  formDescription: string;
  formSubDescription: string;
  fields: {
    id: string;
    name: string;
    type?: string;
    label: string;
    error?: string;
  }[];
  control: Control<FieldValues>;
  //eslint-disable-next-line
  handleSubmit: UseFormHandleSubmit<any>;
  //eslint-disable-next-line
  onSubmit: (data: any) => void;
  submitButtonText: string;
  additionalLink?: { text: string; href: string; linkText: string };
}

const AuthFormTest: React.FC<IAuthFormProps> = ({
  images,
  formTitle,
  formDescription,
  formSubDescription,
  fields,
  control,
  handleSubmit,
  onSubmit,
  submitButtonText,
  additionalLink,
}) => {
  return (
    <div className='flex h-screen bg-[#202020]'>
      <div className='hidden md:flex md:w-1/2'>
        <div className='w-full'>
          <ImageSlider images={images} />
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-center rounded-l-3xl bg-white md:w-1/2'>
        <h6 className='text-xl font-bold text-[#202020]'>{formTitle}</h6>
        <p className='mt-2 text-sm capitalize'>{formDescription}</p>

        <div className='mt-2 flex w-full items-center justify-center gap-3'>
          <div className='w-24 border-b border-b-[#eeeeee]'></div>
          <p className='text-sm capitalize'>{formSubDescription}</p>
          <div className='w-24 border-b border-b-[#eeeeee]'></div>
        </div>

        <div className='my-2 flex w-1/2 items-center justify-center gap-2'>
          <div className='w-1/2'>
            <CustomButton title='google' icon={<GoogleIcon />} />
          </div>
          <div className='w-1/2'>
            <CustomButton title='apple' icon={<AppleIcon />} />
          </div>
        </div>

        <form
          className='flex w-full flex-col items-center justify-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((field) => (
            <div key={field.id} className='w-1/2'>
              <InputField
                id={field.id}
                name={field.name}
                type={field.type}
                control={control}
                label={field.label}
                error={field.error}
              />
            </div>
          ))}

          <div className='mt-2 w-1/2'>
            <CustomButton title={submitButtonText} type='submit' />
          </div>
        </form>

        {additionalLink && (
          <div className='mt-2 flex items-center justify-center'>
            <p className='text-sm capitalize'>{additionalLink.text}</p>
            <Link href={additionalLink.href} className='text-sm font-bold'>
              {additionalLink.linkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFormTest;
