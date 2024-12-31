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
//import { clientData } from '@/utils/dummy-data';
import { debounce } from 'lodash';
import useGetClients from '@/hooks/data-hooks/sidebar/use-get-clients';

interface IFormData {
  search: string;
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  password: null;
  user_type: string;
  is_email_verified: number;
  is_banned: number;
  is_active: number;
  slug: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  address: string;
  phone_number: string;
  date_of_birth: Date;
  profile_picture_url: string;
}

const Sidebar = () => {
  const [users, setUsers] = useState<IClient[]>([]);
  const [allUsers, setAllUsers] = useState<IClient[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: { search: '' },
  });

  const handleCard = (id: number) => {
    //eslint-disable-next-line
    console.log('Card is clicked', id);
    setSelectedCardId(id);
  };

  const submitHandler = useCallback(
    (data: IFormData) => {
      const results = allUsers.filter((item) =>
        item.name.toLowerCase().includes(data?.search?.toLowerCase())
      );
      setUsers(results);
    },
    [allUsers] // Use the full list for filtering
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

  const {
    data,
    // isLoading
    //refetch,
    //isError: isAccountListError,
  } = useGetClients({ limit: 100 });

  useEffect(() => {
    if (data && data.data) {
      setUsers(data.data); // Displayed users
      setAllUsers(data.data); // Full list
      setSelectedCardId(data.data[0]?.id);
    }
  }, [data]);

  return (
    <div className='flex w-64 flex-col border-r border-r-border-primary px-2'>
      <div className='-mx-2 mb-3 border-b border-b-border-primary'>
        <div className='flex flex-col px-6 py-2'>
          <div className='flex items-center justify-between'>
            <p className='text-medium font-semibold'>Client List</p>
            <p className='text-extra-small'>Total Client: {users.length}</p>
          </div>

          <InputField
            id='search'
            name='search'
            control={control as unknown as Control<FieldValues>}
            icon={<SearchIcon />}
            onCustomChange={(value) => debouncedSubmit({ search: value || '' })}
          />
        </div>
      </div>

      <div className='custom-scrollbar h-[calc(100%-100px)] flex-1 overflow-y-auto px-3'>
        {users.length > 0 ? (
          users.map((client) => (
            <ClientCard
              key={client.id}
              data={client}
              isActive={client.id === selectedCardId}
              onClick={() => handleCard(client.id)}
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
          <CustomButton
            title='Add Client'
            icon={<ClientAddIcon />}
            className='btn-gradient'
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
