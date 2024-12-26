import React, { useState } from 'react';
import ChatContainer from './ChatContainer';

export interface IMessage {
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  receiver: string;
  files?: { file: File; url: string }[];
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);

  const addMessage = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const deleteMessageFile = (messageId: string, fileName: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              files: message.files?.filter(
                ({ file }) => file.name !== fileName
              ),
            }
          : message
      )
    );
  };

  return (
    <ChatContainer
      messages={messages}
      onSendMessage={addMessage}
      onDeleteFile={deleteMessageFile}
    />
  );
};

export default Chat;

const initialMessages: IMessage[] = [
  {
    id: '1',
    text: 'Hello!',
    timestamp: '6:00, 8/11/2024',
    sender: 'system',
    receiver: 'user',
  },
  {
    id: '2',
    text: 'How can I help you?',
    timestamp: '6:01, 8/11/2024',
    sender: 'system',
    receiver: 'user',
  },
  {
    id: '3',
    text: 'I need assistance.',
    timestamp: '6:02, 8/11/2024',
    sender: 'user',
    receiver: 'system',
  },
  {
    id: '4',
    text: 'Can you help me?',
    timestamp: '6:03, 8/11/2024',
    sender: 'user',
    receiver: 'system',
  },
  {
    id: '5',
    text: 'Yes, of course. What assistance do you need?',
    timestamp: '6:04, 8/11/2024',
    sender: 'system',
    receiver: 'user',
  },
];
