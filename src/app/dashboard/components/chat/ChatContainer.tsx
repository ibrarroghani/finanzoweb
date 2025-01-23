import React, { useEffect, useRef, useState } from 'react';
import MessageList from './MessageList';
import InputSection from './InputSection';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDashboardPageContext } from '@/app/dashboard/context/DashboardPageContext';

const ChatContainer: React.FC = () => {
  const scrollDivRef = useRef<HTMLDivElement | null>(null);
  const [canCheckScroll, setCanCheckScroll] = useState(false);
  const prevMessagesLength = useRef(0);

  const { messages, isLoadingState, hasMore, fetchMoreData, connectionSlugId } =
    useDashboardPageContext();

  // Reset scroll position immediately when switching clients
  useEffect(() => {
    setCanCheckScroll(false);
    prevMessagesLength.current = 0;

    // Force immediate scroll reset with a double reset
    const resetScroll = () => {
      if (scrollDivRef.current) {
        scrollDivRef.current.style.overflow = 'hidden';
        scrollDivRef.current.scrollTop = 0;

        // Re-enable scrolling after reset
        setTimeout(() => {
          if (scrollDivRef.current) {
            scrollDivRef.current.style.overflow = 'auto';
            scrollDivRef.current.scrollTop = 0;
          }
        }, 50);
      }
    };

    resetScroll();
    // Second reset after a brief delay to ensure it catches any late updates
    setTimeout(resetScroll, 100);

    // Re-enable scroll checking after everything is settled
    const timer = setTimeout(() => {
      setCanCheckScroll(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [connectionSlugId]);

  // Handle scroll checking after messages update
  useEffect(() => {
    if (messages.length !== prevMessagesLength.current) {
      prevMessagesLength.current = messages.length;

      // Only manage scroll checking for normal message updates
      if (!isLoadingState && connectionSlugId) {
        setCanCheckScroll(true);
      }
    }
  }, [messages.length, isLoadingState, connectionSlugId]);

  return (
    <div className='chat-container rounded-extra-small sticky top-0 flex h-[calc(100vh-240px)] w-full flex-col justify-between bg-primary-light py-6'>
      <div
        id='scrollableDiv'
        ref={scrollDivRef}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto',
        }}
        className='custom-scrollbar flex flex-col px-4'
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (!isLoadingState && canCheckScroll && messages.length > 0) {
            const scrollPercentage =
              (Math.abs(target.scrollTop) /
                (target.scrollHeight - target.clientHeight)) *
              100;
            if (scrollPercentage > 90 && hasMore) {
              fetchMoreData();
            }
          }
        }}
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={null}
          endMessage={
            !isLoadingState && messages.length > 0 && !hasMore ? (
              <div className='text-small mb-4 text-center font-bold capitalize text-primary-dark'>
                No more messages
              </div>
            ) : null
          }
          scrollableTarget='scrollableDiv'
          inverse={true}
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            overflow: 'hidden',
          }}
        >
          <MessageList />
        </InfiniteScroll>
      </div>
      <InputSection />
    </div>
  );
};

export default ChatContainer;
