import { Controller, Control, FieldValues } from 'react-hook-form';
import { Input } from 'antd';
const { TextArea } = Input;

interface ITextareaFieldProps {
  placeholder?: string;
  name: string;
  error?: string;
  maxLength?: number;
  control: Control<FieldValues>;
  rows?: number;
  label?: string;
}

const TextareaField: React.FC<ITextareaFieldProps> = ({
  placeholder = 'Please enter a value',
  name,
  error,
  maxLength = 200,
  control,
  rows = 5,
  label,
}) => {
  return (
    <div className='flex flex-col'>
      <div className='py-1'>
        {label && (
          <p className='text-small mb-1 capitalize text-muted'>{label}</p>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <TextArea
              showCount
              maxLength={maxLength}
              onChange={onChange}
              placeholder={placeholder}
              style={{ height: rows * 20, resize: 'none' }}
            />
          )}
        />
      </div>
      {error && (
        <p className='text-small flex items-center gap-1 text-danger'>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextareaField;
