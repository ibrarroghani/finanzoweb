'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ClientCard from '@/app/dashboard/components/ClientCard';
import CustomButton from '../CustomButton';
import InputField from '../InputField';
import { useForm, Control, FieldValues } from 'react-hook-form';
import {
  ClientAddIcon,
  SearchIcon,
} from '@/assets/icons/bussiness-panel-icons';
import { clientData } from '@/utils/dummy-data';
import { debounce } from 'lodash';

interface IFormData {
  search: string;
}

const Sidebar = () => {
  const [users, setUsers] = useState(clientData);
  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: { search: '' },
  });

  const handleCard = () => {
    //eslint-disable-next-line
    console.log('Card is clicked');
  };

  const submitHandler = useCallback(
    (data: IFormData) => {
      const results = users.filter((item) =>
        item.name.toLowerCase().includes(data?.search?.toLowerCase())
      );
      setUsers(results);
    },
    //eslint-disable-next-line
    []
  );

  const debouncedSubmit = useMemo(
    () =>
      debounce((data) => {
        handleSubmit(submitHandler)(data);
      }, 1000),
    [handleSubmit, submitHandler]
  );

  useEffect(() => {
    return () => {
      debouncedSubmit.cancel(); // Debounce Cleanup on unmount
    };
  }, [debouncedSubmit]);

  return (
    <div className='flex w-64 flex-col border-r border-r-border-primary px-2'>
      <div className='-mx-2 mb-3 border-b border-b-border-primary'>
        <div className='flex flex-col px-6 py-2'>
          <div className='flex items-center justify-between'>
            <p className='text-medium font-semibold'>Client List</p>
            <p className='text-extra-small'>Total Client: 10</p>
          </div>

          <InputField
            id='search'
            name='search'
            control={control as unknown as Control<FieldValues>}
            icon={<SearchIcon />}
            onCustomChange={(value) => debouncedSubmit({ search: value })}
          />
        </div>
      </div>

      <div className='custom-scrollbar h-[calc(100%-100px)] flex-1 overflow-y-auto px-3'>
        {users.length > 0 ? (
          users.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              status={client.status}
              onClick={handleCard}
            />
          ))
        ) : (
          <div className='text-small text-center font-bold capitalize text-primary-dark'>
            no user matched
          </div>
        )}
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
