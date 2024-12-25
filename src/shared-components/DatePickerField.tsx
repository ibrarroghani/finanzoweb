import { Controller, Control, FieldValues } from 'react-hook-form';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

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
        {label && (
          <p className='text-small my-1 capitalize text-muted'>{label}</p>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              className='w-full cursor-pointer p-2.5'
              onChange={onChange}
              placeholder={placeholder}
              value={value ? dayjs(value) : null} // Convert Date to dayjs
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

export default DatePickerField;
