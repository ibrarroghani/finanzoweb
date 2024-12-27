import React from 'react';
import { IMessage } from './Chat';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: IMessage[];
  //eslint-disable-next-line
  //onDeleteFile: (messageId: string, fileName: string) => void;

  //eslint-disable-next-line
  onDeleteMessage: (messageId: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  // onDeleteFile,
  onDeleteMessage,
}) => (
  <>
    {messages.map((message) => (
      <MessageItem
        key={message.id}
        message={message}
        // onDeleteFile={onDeleteFile}
        onDeleteMessage={onDeleteMessage}
      />
    ))}
  </>
);

export default MessageList;
