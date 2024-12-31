import React from 'react';
import ClientCard from '@/app/dashboard/components/ClientCard';
import Spinner from '@/shared-components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IClient } from './Sidebar';

interface IUserListProps {
  users: IClient[];
  isLoading: boolean;
  fetchMoreData: () => void;
  hasMore: boolean;
  selectedCard: IClient | undefined;
  //eslint-disable-next-line
  onCardSelect: (id: number) => void;
  scrollableDivRef: React.RefObject<HTMLDivElement>;
  isSearching: boolean;
}

const UserList = ({
  users,
  isLoading,
  fetchMoreData,
  hasMore,
  selectedCard,
  onCardSelect,
  scrollableDivRef,
  isSearching,
}: IUserListProps) => {
  return (
    <div
      id='scrollableDiv'
      ref={scrollableDivRef}
      className='custom-scrollbar h-[calc(100%-100px)] flex-1 overflow-y-auto px-3'
    >
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          isSearching ? null : (
            <div className='text-small text-center font-bold capitalize text-primary-dark'>
              Loading...
            </div>
          )
        }
        // endMessage={
        //   <div className='text-small text-center font-bold capitalize text-primary-dark'>
        //     No more clients
        //   </div>
        // }
        scrollableTarget='scrollableDiv'
      >
        {isLoading ? (
          <div className='mt-8 flex justify-center overflow-hidden'>
            <Spinner />
          </div>
        ) : users.length > 0 ? (
          users.map((client: IClient) => (
            <ClientCard
              key={client.id}
              data={client}
              isActive={client.id === selectedCard?.id}
              onClick={() => onCardSelect(client.id)}
            />
          ))
        ) : (
          <div className='text-small text-center font-bold capitalize text-primary-dark'>
            No user matched
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default UserList;
