import React from 'react';
import MessageItem from './MessageItem';
import { useDashboardPageContext } from '@/app/dashboard/context/DashboardPageContext';

const MessageList: React.FC = () => {
  const { messages } = useDashboardPageContext();
  return (
    <>
      {messages.length > 0 &&
        messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
    </>
  );
};

export default MessageList;
