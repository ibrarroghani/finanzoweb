import CustomButton from '@/shared-components/CustomButton';
import InputField from '@/shared-components/InputField';
import TextareaField from '@/shared-components/TextareaField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'antd';
import React from 'react';
import { useForm, Control, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import {
  emailValidationRegex,
  phoneValidationRegex,
} from '@/utils/validation-regex';

interface IFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface IAddClientModalProps {
  title: string;
  showModal: boolean;
  setShowModal: () => void;
}

const addClientValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .trim()
    .matches(phoneValidationRegex, 'Invalid phone number format')
    .min(1, 'Phone number is required and at least 1 character long')
    .required(),

  email: yup
    .string()
    .trim()
    .matches(emailValidationRegex, 'Invalid email format')
    .required('Email is required'),
  message: yup.string().required('Message is required'),
});

const AddClientModal: React.FC<IAddClientModalProps> = ({
  title,
  showModal,
  setShowModal,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    resolver: yupResolver<IFormData>(addClientValidationSchema),
  });

  const handleFromSubmit = (data: IFormData) => {
    //eslint-disable-next-line no-console
    console.log(data);
    setShowModal();
  };

  return (
    <div>
      <Modal
        title={title}
        centered
        open={showModal}
        onCancel={setShowModal}
        footer={null}
      >
        <div className='flex flex-col'>
          <form className='w-full' onSubmit={handleSubmit(handleFromSubmit)}>
            <InputField
              id='name'
              name='name'
              control={control as unknown as Control<FieldValues>}
              label='Name'
              labelPosition='outside'
              placeholder='Enter Name'
              error={formErrors.name?.message}
            />
            <InputField
              id='phone'
              name='phone'
              control={control as unknown as Control<FieldValues>}
              label='Phone'
              labelPosition='outside'
              placeholder='Enter Phone'
              error={formErrors.phone?.message}
            />
            <InputField
              id='email'
              name='email'
              control={control as unknown as Control<FieldValues>}
              label='Email'
              labelPosition='outside'
              placeholder='Enter Email'
              error={formErrors.email?.message}
            />
            <TextareaField
              label='Message'
              control={control as unknown as Control<FieldValues>}
              name='message'
              error={formErrors.message?.message}
              rows={5}
              placeholder='Enter Message'
              maxLength={350}
            />
            <div className='my-8'>
              <CustomButton type='submit' title='Send Request' />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddClientModal;
