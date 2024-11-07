import { Controller, Control, FieldValues } from 'react-hook-form';
import { Input } from 'antd';

interface InputFieldProps {
  placeholder?: string;
  type?: string;
  name: string;
  error?: string;
  label?: string;
  readOnly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues, any>;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder = 'Please enter a value',
  type = 'text',
  name,
  error,
  label,
  control,
}) => {
  return (
    <div className='relative flex flex-col'>
      <div className='relative py-2'>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type={type}
              onChange={onChange}
              value={value}
              placeholder={placeholder ?? ''}
            />
          )}
        />
        {label && (
          <p className='absolute left-5 top-[20%] text-[11px] text-black'>
            {label}
          </p>
        )}
      </div>
      {error && (
        <p className='flex items-center gap-1 text-sm text-red-400'>{error}</p>
      )}
    </div>
  );
};

export default InputField;
