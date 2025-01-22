import React from 'react';
import ChatContainer from './ChatContainer';
import Spinner from '@/shared-components/Spinner';
import { useDashboardPageContext } from '@/app/dashboard/context/DashboardPageContext';

const Chat = () => {
  const { isLoadingState } = useDashboardPageContext();

  return (
    <div className='relative h-full'>
      {isLoadingState && (
        <div className='absolute inset-0 z-10 mt-32 flex justify-center bg-white bg-opacity-75'>
          <Spinner />
        </div>
      )}
      <div className='h-full'>
        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;
