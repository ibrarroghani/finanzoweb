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
      <div className='relative py-2'>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <DatePicker
              className='w-full px-4 py-6 pb-2'
              onChange={onChange}
              placeholder={placeholder}
            />
          )}
        />
        {label && <p className='absolute left-4 top-[20%] text-10'>{label}</p>}
      </div>
      {error && (
        <p className='flex items-center gap-1 text-sm text-red-500'>{error}</p>
      )}
    </div>
  );
};

export default DatePickerField;
