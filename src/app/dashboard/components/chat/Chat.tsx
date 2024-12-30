import React, { useEffect, useState } from 'react';
import ChatContainer from './ChatContainer';
//import useGetConnectMessage from '@/hooks/data-hooks/chat/use-get-connect-message';
import useGetMessages from '@/hooks/data-hooks/chat/use-get-messages';
import useSendMessage from '@/hooks/data-hooks/chat/use-send-message';
import Spinner from '@/shared-components/Spinner';
import { useIsFetching } from '@tanstack/react-query';

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

// export interface IMessage {
//   id: string;
//   message: string;
//   dateTime: Date;
//   type: MessageType;
//   sender: SenderType;
//   senderName: string;
//   //eslint-disable-next-line
//   senderImage: any;
//   senderImageType: SenderImageType;
//   status: StatusType;
//   files?: { file: File; url: string }[];
// }

export interface Sender {
  id: number;
  name: string;
  email: string;
  slug: string;
  details: Details;
}

export interface Details {
  id: number;
  address: string;
  profile_picture_url: string;
  phone_number: string;
}

export interface IMessage {
  id: number;
  thread_id: number;
  sender_id: number;
  message: string;
  seen_at: null;
  created_at: Date;
  sender_name: string;
  sender_email: string;
  sender_slug: string;
  sender_details_id: number;
  sender_address: string;
  sender_profile_picture_url: string;
  sender_phone_number: string;
  sender: Sender;
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [connectionSlugId, setConnectionId] = useState<string>(
  //   'message-thread-5ec4cf91-8e9f-4fa2-9145-67730090da1d-8db6a520-f6b3-4b7f-a053-0f0d178cc892'
  // );

  const connectionSlugId =
    'message-thread-5ec4cf91-8e9f-4fa2-9145-67730090da1d-8db6a520-f6b3-4b7f-a053-0f0d178cc892';

  const { mutate: sendMessage, isPending } = useSendMessage(connectionSlugId);
  // const {
  //   data: chatConnectMessageData,
  //   //isLoading:isAccountListLoading,
  //   //isError: isAccountListError,
  // } = useGetConnectMessage();

  const {
    data: messagesData,
    isLoading: isMessageLoading,
    //refetch,
    //isError: isAccountListError,
  } = useGetMessages(connectionSlugId, { limit: 100 });

  const isFetching = useIsFetching({ queryKey: ['getMessages'] });

  //eslint-disable-next-line
  const addMessage = (message: any) => {
    //console.log('addMessage', message);
    // setMessages((prev) => [...prev, message]);
    if (isPending) return;
    sendMessage({
      message,
    });
  };

  // useEffect(() => {
  //   if (chatConnectMessageData && chatConnectMessageData.data) {
  //     setConnectionId(chatConnectMessageData.data?.slug);
  //   }
  // }, [chatConnectMessageData]);

  useEffect(() => {
    if (messagesData && messagesData.data) {
      setMessages(messagesData.data);
    }
  }, [messagesData]);

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

  // const deleteMessage = (messageId: string) => {
  //   setMessages((prev) =>
  //     prev.map((message) =>
  //       message.id === messageId ? { ...message, status: 'deleted' } : message
  //     )
  //   );
  // };

  const isLoadingState = isMessageLoading || isFetching > 0;

  return (
    <div className='relative h-full'>
      {isLoadingState && (
        <div className='absolute inset-0 z-10 mt-32 flex justify-center bg-white bg-opacity-75'>
          <Spinner />
        </div>
      )}
      <div className='h-full'>
        <ChatContainer
          messages={messages}
          onSendMessage={addMessage}
          isLoading={isLoadingState}
          //onDeleteFile={deleteMessageFile}
          //onDeleteMessage={deleteMessage}
        />
      </div>
    </div>
  );
};

export default Chat;

// const initialMessages: IMessage[] = [
//   {
//     id: '1',
//     message: 'Hi',
//     dateTime: new Date(),
//     type: 'text',
//     sender: 'client',
//     senderName: 'John Doe (Client)',
//     senderImage: '',
//     senderImageType: 'source',
//     status: 'unread',
//   },
//   {
//     id: '2',
//     message: 'Hello, how can I help you?',
//     dateTime: new Date(),
//     type: 'text',
//     sender: 'broker',
//     senderName: 'John Doe2 (Broker)',
//     senderImage: '',
//     senderImageType: 'source',
//     status: 'unread',
//   },
// ];
