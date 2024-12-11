import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { Select } from 'antd';

interface IOption {
  value: string | number;
  label: string;
}

interface ISelectFieldProps {
  label?: string;
  options: IOption[];
  name: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  control: Control<FieldValues>;
  value?: string;
}

const SelectField: React.FC<ISelectFieldProps> = ({
  options,
  name,
  placeholder = 'Please select a value',
  error,
  control,
  disabled,
  value,
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
              defaultValue={value}
            />
          )}
        />
      </div>

      {error && (
        <p className='text-small flex items-center gap-1 py-1 text-danger'>
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
