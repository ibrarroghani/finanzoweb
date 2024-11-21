import { Controller, Control, FieldValues } from 'react-hook-form';
import { Input } from 'antd';

interface IInputFieldProps {
  placeholder?: string;
  type?: string;
  name: string;
  error?: string;
  label?: string;
  readOnly?: boolean;
  control: Control<FieldValues>;
}

const InputField: React.FC<IInputFieldProps> = ({
  placeholder = 'Please enter a value',
  type = 'text',
  name,
  error,
  control,
}) => {
  return (
    <div className='flex flex-col'>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <Input
              type={type}
              onChange={onChange}
              placeholder={placeholder ?? ''}
            />
          )}
        />
      </div>
      {error && (
        <p className='flex items-center gap-1 text-sm text-red-400'>{error}</p>
      )}
    </div>
  );
};

export default InputField;
