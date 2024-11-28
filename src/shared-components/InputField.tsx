import { Controller, Control, FieldValues } from 'react-hook-form';

interface IInputFieldProps {
  id: string;
  placeholder?: string;
  type?: string;
  name: string;
  error?: string;
  label?: string;
  readOnly?: boolean;
  control: Control<FieldValues>;
  readonly?: boolean;
}

const InputField: React.FC<IInputFieldProps> = ({
  id,
  placeholder = 'Please enter a value',
  type = 'text',
  name,
  error,
  control,
  label,
  readOnly,
}) => {
  return (
    <div className='relative flex flex-col'>
      <div className='relative py-2'>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              readOnly={readOnly ?? false}
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className='block w-full max-w-full rounded-md border border-[#eeeeee] bg-white px-4 py-6 pb-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-1 focus:outline-green-300'
            />
          )}
        />

        <p className='absolute left-4 top-[20%] text-[11px] text-[#202020]'>
          {label}
        </p>
      </div>
      {error !== undefined ? (
        <p className='flex items-center gap-1 text-sm text-red-400'>{error}</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default InputField;
