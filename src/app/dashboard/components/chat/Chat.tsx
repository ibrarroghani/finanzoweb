import React, { useState } from 'react';
import ChatContainer from './ChatContainer';

// export interface IMessage {
//   id: string;
//   text: string;
//   timestamp: string;
//   sender: string;
//   receiver: string;
//   files?: { file: File; url: string }[];
// }

export type MessageType = 'text' | 'image' | 'file';
export type SenderType = 'client' | 'broker';
export type SenderImageType = 'source' | 'uri';
export type StatusType = 'sending' | 'unread' | 'read' | 'edited' | 'deleted';

export interface IMessage {
  id: string;
  message: string;
  dateTime: Date;
  type: MessageType;
  sender: SenderType;
  senderName: string;
  //eslint-disable-next-line
  senderImage: any;
  senderImageType: SenderImageType;
  status: StatusType;
  files?: { file: File; url: string }[];
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);

  const addMessage = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  // const deleteMessageFile = (messageId: string, fileName: string) => {
  //   console.log('deleteMessageFile', messageId, fileName);
  //   setMessages((prev) =>
  //     prev.map((message) =>
  //       message.id === messageId
  //         ? {
  //             ...message,
  //             files: message.files?.map((file) =>
  //               file.file.name === fileName
  //                 ? { ...file, status: 'deleted' }
  //                 : file
  //             ),
  //           }
  //         : message
  //     )
  //   );
  // };

  const deleteMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, status: 'deleted' } : message
      )
    );
  };

  return (
    <ChatContainer
      messages={messages}
      onSendMessage={addMessage}
      //onDeleteFile={deleteMessageFile}
      onDeleteMessage={deleteMessage}
    />
  );
};

export default Chat;

const initialMessages: IMessage[] = [
  {
    id: '1',
    message: 'Hello, how can I help you?',
    dateTime: new Date(),
    type: 'text',
    sender: 'client',
    senderName: 'John Doe (Client)',
    senderImage: '',
    senderImageType: 'source',
    status: 'unread',
  },
];
