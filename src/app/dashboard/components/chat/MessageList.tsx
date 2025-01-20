import React from 'react';
import { IMessage } from './Chat';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: IMessage[];

  //eslint-disable-next-line
  onMarkAsRead: (messageId: number[]) => void;

  //eslint-disable-next-line
  onDeleteFile: (slugId: string) => void;

  //eslint-disable-next-line
  // onDeleteMessage: (messageId: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onMarkAsRead,
  onDeleteFile,
  //onDeleteMessage,
}) => (
  <>
    {messages.length > 0 &&
      messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onMarkAsRead={onMarkAsRead}
          onDeleteFile={onDeleteFile}
          //onDeleteMessage={onDeleteMessage}
        />
      ))}
  </>
);

export default MessageList;
