import React, { useRef, useEffect } from 'react';
import MessageList from './MessageList';
import InputSection from './InputSection';
import { IMessage } from './Chat';

interface ChatContainerProps {
  messages: IMessage[];
  //eslint-disable-next-line
  onSendMessage: (message: IMessage) => void;
  //eslint-disable-next-line
  onDeleteFile: (messageId: string, fileName: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onSendMessage,
  onDeleteFile,
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
        className='custom-scrollbar flex flex-col overflow-y-auto px-4'
      >
        <MessageList messages={messages} onDeleteFile={onDeleteFile} />
      </div>
      <InputSection onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatContainer;
