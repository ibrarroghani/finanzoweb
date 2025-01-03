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
import { useDispatch, useSelector } from 'react-redux';
import { setClient, setLoading } from '@/store/slices/auth-slice';
import { RootState } from '@/store';

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

const deduplicateById = (clients: IClient[]) =>
  clients.filter(
    (item, index, self) => self.findIndex((i) => i.id === item.id) === index
  );

const Sidebar = () => {
  const [users, setUsers] = useState<IClient[]>([]);
  const [allUsers, setAllUsers] = useState<IClient[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // New state for search loading
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const slectedClient = useSelector((state: RootState) => state.auth.client);
  const dispatch = useDispatch();

  const { control, handleSubmit, watch } = useForm<IFormData>({
    defaultValues: { search: '' },
  });
  const searchValue = watch('search');

  const { data, refetch, isLoading } = useGetClients({
    page: page,
    limit: 10,
    search: { name: searchValue },
  });

  // Memoize transformClientData function
  const transformClientData = useCallback(
    (selectedUser: IClient) => ({
      id: selectedUser.id,
      name: selectedUser.name,
      email: selectedUser.email,
      image: selectedUser.profile_picture_url,
      slug: selectedUser.slug,
      address: selectedUser.address,
      phone: selectedUser.phone_number,
      status: selectedUser.is_active,
    }),
    []
  );

  // Memoize users array to prevent unnecessary re-renders
  const memoizedUsers = useMemo(() => users, [users]);

  useEffect(() => {
    dispatch(setLoading(true)); // Set loading to true before fetching data
    refetch().finally(() => {
      dispatch(setLoading(false)); // Set loading to false after data is fetched
    });
  }, [dispatch, refetch]);

  // Optimize the data effect by moving the client selection logic to a separate effect
  useEffect(() => {
    if (data?.data && !isSearching) {
      //eslint-disable-next-line
      const clientData = data as any;

      if (!searchValue.trim()) {
        setAllUsers((prev) => deduplicateById([...prev, ...clientData.data]));
        setUsers((prev) => deduplicateById([...prev, ...clientData.data]));
      } else {
        setUsers(clientData.data);
        setPage(1);
      }

      setHasMore(clientData.meta.currentPage < clientData.meta.totalPages);
    }
  }, [data, searchValue, isSearching]);

  // Separate effect for initial client selection
  useEffect(() => {
    if (!slectedClient.id && data?.data?.length > 0) {
      dispatch(setClient(transformClientData(data?.data[0])));
    }
  }, [data, slectedClient.id, dispatch, transformClientData]);

  const handleCardSelection = useCallback(
    (id: number) => {
      const selectedUser = users.find((user) => user.id === id);
      if (selectedUser) {
        dispatch(setClient(transformClientData(selectedUser)));
      }
    },
    [users, dispatch, transformClientData]
  );

  const submitHandler = useCallback(
    (data: IFormData) => {
      const searchTerm = data.search.trim().toLowerCase();
      setIsSearching(!!searchTerm);
      refetch().finally(() => setIsSearching(false));
    },
    [refetch]
  );

  const debouncedSubmit = useMemo(
    () =>
      debounce((data) => {
        handleSubmit(submitHandler)(data);
      }, 500),
    [handleSubmit, submitHandler]
  );

  // Handle Search Input Changes
  useEffect(() => {
    if (!searchValue.trim()) {
      setUsers(allUsers);
    } else {
      setIsSearching(true);
      setUsers([]);
      debouncedSubmit({ search: searchValue });
    }
  }, [searchValue, allUsers, debouncedSubmit]);

  // Fetch More Data for Pagination
  const fetchMoreData = useCallback(() => {
    if (!searchValue) setPage((prevPage) => prevPage + 1);
  }, [searchValue]);

  return (
    <div className='flex w-64 flex-col border-r border-r-border-primary px-2'>
      <SidebarHeader
        control={control as unknown as Control<FieldValues>}
        onSearch={debouncedSubmit}
        totalClients={memoizedUsers.length}
      />

      <UserList
        users={memoizedUsers}
        isLoading={isLoading || isSearching}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
        slectedClientId={slectedClient.id}
        onCardSelect={handleCardSelection}
        scrollableDivRef={scrollableDivRef}
        isSearching={!!searchValue}
      />

      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
