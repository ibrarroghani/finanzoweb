'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import useGetClients from '@/hooks/data-hooks/sidebar/use-get-clients';
import SidebarFooter from './SidebarFooter';
import UserList from './UserList';
import SidebarHeader from './SidebarHeader';

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
  const [selectedCard, setSelectedCard] = useState<IClient | undefined>(
    undefined
  );

  const [page, setPage] = useState(1); // Current page for pagination
  const [hasMore, setHasMore] = useState(false); // Track if more data is available
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const { control, handleSubmit, watch } = useForm<IFormData>({
    defaultValues: { search: '' },
  });

  const searchValue = watch('search');

  const { data, refetch } = useGetClients({ page: page, limit: 5 });
  const { data: allClients, isLoading } = useGetClients({
    limit: 100,
  });

  useEffect(() => {
    if (allClients && allClients.data) {
      setAllUsers(allClients.data);
    }
  }, [allClients]);

  useEffect(() => {
    if (data && data.data) {
      //eslint-disable-next-line
      const clientData = data as any;
      setUsers((prev) => [...prev, ...clientData.data]); // Append new data to existing users
      setSelectedCard((prev) => prev || data.data[0]); // Select the first card by default
      setHasMore(clientData.meta.currentPage < clientData.meta.totalPages); // Check if more data is available
    }
  }, [data]);

  const handleCardSelection = useCallback(
    (id: number) => {
      setSelectedCard(users.find((user) => user.id === id));
    },
    [users]
  );

  // Reset Users to Initial State
  const resetUsers = useCallback(() => {
    setUsers(allUsers.slice(0, page * 5));
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = 0;
    }
  }, [allUsers, page]);

  const submitHandler = useCallback(
    (data: IFormData) => {
      if (data.search) {
        const results = allUsers.filter((item) =>
          item.name.toLowerCase().includes(data?.search?.toLowerCase())
        );
        setUsers(results);
      } else {
        resetUsers();
      }
    },
    [allUsers, resetUsers]
  );

  const debouncedSubmit = useMemo(
    () =>
      debounce((data) => {
        handleSubmit(submitHandler)(data);
      }, 500),
    [handleSubmit, submitHandler]
  );

  useEffect(() => {
    return () => {
      debouncedSubmit.cancel(); // Debounce Cleanup on unmount
    };
  }, [debouncedSubmit]);

  // Fetch More Data for Pagination
  const fetchMoreData = useCallback(() => {
    if (searchValue) return;
    setPage((prevPage) => prevPage + 1);
    refetch();
  }, [refetch, searchValue]);

  //const isLoadingState = isLoading || allClientsLoading;

  return (
    <div className='flex w-64 flex-col border-r border-r-border-primary px-2'>
      <SidebarHeader
        control={control as unknown as Control<FieldValues>}
        onSearch={debouncedSubmit}
        totalClients={users.length}
      />

      <UserList
        users={users}
        isLoading={isLoading}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
        selectedCard={selectedCard}
        onCardSelect={handleCardSelection}
        scrollableDivRef={scrollableDivRef}
        isSearching={!!searchValue}
      />

      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
