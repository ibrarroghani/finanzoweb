import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { Select } from 'antd';

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  options: Option[];
  name: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  control: Control<FieldValues>;
}

const SelectField: React.FC<SelectFieldProps> = ({
  options,
  name,
  placeholder = 'Please select a value',
  error,
  control,
  disabled,
}) => {
  return (
    <div className='flex flex-col'>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <Select
              disabled={disabled ?? false}
              placeholder={placeholder ?? ''}
              className='w-full'
              onChange={onChange}
              options={options}
            />
          )}
        />
      </div>

      {error && (
        <p className='flex items-center gap-1 py-1 text-sm text-red-400'>
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
