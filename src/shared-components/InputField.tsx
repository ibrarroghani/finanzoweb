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
  labelPosition?: 'inside' | 'outside';
  //eslint-disable-next-line no-unused-vars
  onCustomChange?: (value: string) => void; // Custom change handler
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
  labelPosition = 'inside',
  onCustomChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative flex flex-col'>
      <div className='relative py-2'>
        {/* Render label or icon based on props */}
        {icon ? (
          <span className='absolute left-3 top-[35%] mr-5'>{icon}</span>
        ) : labelPosition === 'inside' ? (
          <p className='text-extra-small absolute left-4 top-[20%] text-muted'>
            {label}
          </p>
        ) : (
          <p className='text-small my-1 capitalize text-muted'>{label}</p>
        )}

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
              onChange={(e) => {
                const newValue = e.target.value;
                onChange(newValue); // Update form state
                onCustomChange?.(newValue); // Trigger custom logic
              }}
              className={`${icon ? 'py-2 pl-8 pr-4' : labelPosition === 'outside' ? 'p-2.5' : 'px-4 py-6 pb-2'} no-spinner text-medium block w-full max-w-full rounded-md border border-border-light bg-primary-light text-primary-dark placeholder-muted ring-offset-0 hover:ring-1 hover:ring-success focus:outline-1 focus:outline-success`}
            />
          )}
        />

        {type === 'password' && (
          <span
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-3 flex cursor-pointer items-center'
          >
            {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}{' '}
          </span>
        )}
      </div>
      {error !== undefined ? (
        <p className='text-small flex items-center gap-1 text-danger'>
          {error}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default InputField;
