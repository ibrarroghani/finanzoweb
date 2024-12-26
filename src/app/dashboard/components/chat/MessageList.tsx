import React from 'react';
import { IMessage } from './Chat';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: IMessage[];
  //eslint-disable-next-line
  onDeleteFile: (messageId: string, fileName: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onDeleteFile,
}) => (
  <>
    {messages.map((message) => (
      <MessageItem
        key={message.id}
        message={message}
        onDeleteFile={onDeleteFile}
      />
    ))}
  </>
);

export default MessageList;
