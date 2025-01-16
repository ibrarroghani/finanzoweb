import React from 'react';
import MessageList from './MessageList';
import InputSection from './InputSection';
import { IMessage } from './Chat';
import InfiniteScroll from 'react-infinite-scroll-component';

interface ChatContainerProps {
  messages: IMessage[];
  //eslint-disable-next-line
  onSendMessage: (message: string) => void;

  //eslint-disable-next-line
  onMarkAsRead: (messageId: number[]) => void;

  //eslint-disable-next-line
  //onDeleteFile: (messageId: string, fileName: string) => void;

  //eslint-disable-next-line
  //onDeleteMessage: (messageId: string) => void;

  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onSendMessage,
  onMarkAsRead,
  //onDeleteFile,
  // onDeleteMessage,
  isLoading,
  hasMore,
  loadMore,
}) => {
  // const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollTo({
  //     top: messagesEndRef.current.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // }, [messages]);

  return (
    <div className='rounded-extra-small sticky top-0 flex w-full flex-col justify-between bg-primary-light py-6'>
      <div
        id='scrollableDiv'
        //ref={messagesEndRef}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          height: '300px',
          overflowY: 'auto',
        }}
        className='custom-scrollbar flex flex-col px-4'
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          const isAtTop =
            Math.abs(
              target.scrollHeight + target.scrollTop - target.clientHeight
            ) < 1;

          if (isAtTop && hasMore) {
            loadMore();
          }
        }}
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={loadMore}
          hasMore={hasMore}
          loader={null}
          endMessage={
            !isLoading && messages.length > 0 && !hasMore ? (
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
          <MessageList messages={messages} onMarkAsRead={onMarkAsRead} />
        </InfiniteScroll>
      </div>
      <InputSection onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
