import { Controller, Control, FieldValues } from 'react-hook-form';
import { DatePicker } from 'antd';

interface IDatePickerFieldProps {
  placeholder?: string;
  name: string;
  error?: string;
  control: Control<FieldValues>;
  label?: string;
}

const DatePickerField: React.FC<IDatePickerFieldProps> = ({
  placeholder = 'Please select a date',
  name,
  error,
  control,
  label,
}) => {
  return (
    <div className='flex flex-col'>
      <div>
        {label && <p className='my-1 text-12 capitalize'>{label}</p>}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <DatePicker
              className='w-full cursor-pointer p-2.5'
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
