import { Controller, Control, FieldValues } from 'react-hook-form';
import { Input } from 'antd';
const { TextArea } = Input;

interface ITextareaFieldProps {
  placeholder?: string;
  name: string;
  error?: string;
  maxLength?: number;
  control: Control<FieldValues>;
}

const TextareaField: React.FC<ITextareaFieldProps> = ({
  placeholder = 'Please enter a value',
  name,
  error,
  maxLength = 100,
  control,
}) => {
  return (
    <div className='flex flex-col'>
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
              style={{ height: 120 }}
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
