'use client';
import React from 'react';
import ClientCard from '@/app/dashboard/components/ClientCard';
import CustomButton from '../CustomButton';
import InputField from '../InputField';
import { useForm, Control, FieldValues } from 'react-hook-form';
import {
  ClientAddIcon,
  SearchIcon,
} from '@/assets/icons/bussiness-panel-icons';
import { clientData } from '@/utils/dummy-data';

const Sidebar = () => {
  const { control } = useForm();

  const handleCard = () => {
    //eslint-disable-next-line
    console.log('Card is clicked');
  };

  return (
    <div className='flex w-64 flex-col border-r border-r-border-primary px-2'>
      <div className='-mx-2 mb-3 border-b border-b-border-primary'>
        <div className='flex flex-col px-6 py-2'>
          <div className='flex items-center justify-between'>
            <p className='text-medium font-semibold'>Client List</p>
            <p className='text-extra-small'>Total Client: 10</p>
          </div>

          <InputField
            id='firstName'
            name='firstName'
            control={control as unknown as Control<FieldValues>}
            icon={<SearchIcon />}
            // error={formErrors.firstName?.message}
            //label='Email'
          />
        </div>
      </div>

      <div className='custom-scrollbar h-[calc(100%-100px)] flex-1 overflow-y-auto px-3'>
        {clientData.map((client) => (
          <ClientCard
            key={client.id}
            name={client.name}
            status={client.status}
            onClick={handleCard}
          />
        ))}
      </div>

      <div className='-mx-2 border-t border-t-border-primary'>
        <div className='my-4 pl-4 pr-8'>
          <CustomButton title='Add Client' icon={<ClientAddIcon />} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
