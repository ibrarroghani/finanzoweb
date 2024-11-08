import { Controller, Control, FieldValues } from 'react-hook-form';
import { Input } from 'antd';
const { TextArea } = Input;

interface TextareaFieldProps {
  placeholder?: string;
  name: string;
  error?: string;
  maxLength?: number;
  control: Control<FieldValues>;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  placeholder = 'Enter your value',
  name,
  error,
  maxLength = 100,
  control,
}) => {
  return (
    <div className='flex flex-col py-2'>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <TextArea
              showCount
              maxLength={maxLength}
              onChange={onChange}
              placeholder={placeholder}
            />
          )}
        />
      </div>
      {error && (
        <p className='flex items-center gap-1 text-sm text-red-500'>{error}</p>
      )}
    </div>
  );
};

export default TextareaField;
