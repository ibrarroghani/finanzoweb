import React, { useRef, useEffect } from 'react';
import MessageList from './MessageList';
import InputSection from './InputSection';
import { IMessage } from './Chat';

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
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onSendMessage,
  onMarkAsRead,
  //onDeleteFile,
  // onDeleteMessage,
  isLoading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className='rounded-extra-small sticky top-0 flex h-[calc(100vh-240px)] w-full flex-col justify-between bg-primary-light py-6'>
      <div
        ref={messagesEndRef}
        className='custom-scrollbar flex flex-col overflow-hidden overflow-y-auto px-4'
      >
        <MessageList
          messages={messages}
          onMarkAsRead={onMarkAsRead}
          // onDeleteFile={onDeleteFile}
          //onDeleteMessage={onDeleteMessage}
        />
      </div>
      <InputSection onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
