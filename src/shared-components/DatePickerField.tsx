import { Controller, Control, FieldValues } from 'react-hook-form';
import { DatePicker } from 'antd';

interface DatePickerFieldProps {
  placeholder?: string;
  name: string;
  error?: string;
  control: Control<FieldValues>;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  placeholder = 'Please select a date',
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
            <DatePicker
              className='w-full'
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

export default DatePickerField;
