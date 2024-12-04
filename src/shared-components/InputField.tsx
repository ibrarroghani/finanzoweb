'use client';
import {
  EyeCloseIcon,
  EyeOpenIcon,
} from '@/assets/icons/bussiness-panel-icons';
import { useState } from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

interface IInputFieldProps {
  id: string;
  placeholder?: string;
  type?: string;
  name: string;
  error?: string;
  label?: string;
  readOnly?: boolean;
  control: Control<FieldValues>;
  readonly?: boolean;
  icon?: React.ReactNode;
}

const InputField: React.FC<IInputFieldProps> = ({
  id,
  placeholder = 'Please enter a value',
  type = 'text',
  name,
  error,
  control,
  label,
  readOnly,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative flex flex-col'>
      <div className='relative py-2'>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              readOnly={readOnly ?? false}
              id={id}
              type={showPassword ? 'text' : type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={`${icon ? 'py-2 pl-8 pr-4' : 'px-4 py-6 pb-2'} no-spinner text-15 bg-primary-light block w-full max-w-full rounded-md border border-[#eeeeee] text-gray-900 placeholder-gray-400 focus:outline-1 focus:outline-green-300`}
            />
          )}
        />

        {/* Render label or icon based on props */}
        {icon ? (
          <span className='absolute left-3 top-[35%] mr-5 text-gray-500'>
            {icon}
          </span>
        ) : (
          <p className='text-10 absolute left-4 top-[20%]'>{label}</p>
        )}

        {type === 'password' && (
          <span
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-600'
          >
            {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}{' '}
          </span>
        )}
      </div>
      {error !== undefined ? (
        <p className='flex items-center gap-1 text-sm text-red-400'>{error}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default InputField;
