import React, { useCallback, useEffect, useState } from 'react';
import ChatContainer from './ChatContainer';
//import useGetConnection from '@/hooks/data-hooks/chat/use-get-connect-message';
import useGetMessages from '@/hooks/data-hooks/chat/use-get-messages';
//import useSendMessage from '@/hooks/data-hooks/chat/use-send-message';
import Spinner from '@/shared-components/Spinner';
import { useIsFetching } from '@tanstack/react-query';
//import { RootState } from '@/store';
//import { useSelector } from 'react-redux';
import {
  connectSocket,
  disconnectSocket,
  sendMessage,
  socket,
  markAsSeen,
} from '@/socket/socket';
import { SOCKET_EVENTS } from '@/socket/constants/socketEvents';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { notification } from 'antd';

export type MessageType = 'text' | 'image' | 'file';
export type SenderType = 'client' | 'broker';
export type SenderImageType = 'source' | 'uri';
export type StatusType = 'sending' | 'unread' | 'read' | 'edited' | 'deleted';

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
  seen_at: Date | null;
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

interface SeenData {
  messageIds: number[];
  seenBy: {
    id: string;
    name: string;
    // add other user fields you need
  };
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [connectionSlugId, setConnectionId] = useState<string>('');
  const [socketConnected, setSocketConnected] = useState(false);
  // Add this line to get currentUserId from Redux store
  const currentUserId = useSelector((state: RootState) => state.auth.user.slug);
  const connectionSlugId =
    'message-thread-0e90905a-b136-40bb-9a52-d18eaa0113f5-2b266330-a5cb-46fa-be38-17c6f3b79210';

  // const clientSlug = useSelector((state: RootState) => state.auth.client.slug);
  // console.log('clientSlug', clientSlug);

  // const {
  //   data: chatConnectedData,
  //   //isLoading:isAccountListLoading,
  //   //isError: isAccountListError,
  // } = useGetConnection(clientSlug);

  //const { mutate: sendMessage, isPending } = useSendMessage(connectionSlugId);

  const { data: messagesData, isLoading: isMessageLoading } = useGetMessages(
    connectionSlugId,
    { limit: 100 }
  );

  const isFetching = useIsFetching({ queryKey: ['getMessages'] });

  // //eslint-disable-next-line
  // const addMessage = (message: any) => {
  //   if (isPending) return;
  //   sendMessage({
  //     message,
  //   });
  // };

  // ... existing imports ...

  const handleMarkAsSeenReceived = useCallback((result: { data: SeenData }) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        result.data.messageIds.includes(msg.id)
          ? {
              ...msg,
              seen_at: new Date(),
              seen_by: result.data.seenBy,
            }
          : msg
      )
    );
  }, []);

  const handleMarkAsRead = useCallback(
    (messageIds: number[]) => {
      if (!socketConnected || !connectionSlugId) return;

      // Get only messages that were received (not sent by current user)
      const receivedMessageIds = messages
        .filter(
          (msg) =>
            messageIds.includes(msg.id) && msg.sender_slug !== currentUserId
        )
        .map((msg) => msg.id);

      if (receivedMessageIds.length === 0) return;

      // Update local state only for received messages
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          receivedMessageIds.includes(msg.id)
            ? {
                ...msg,
                seen_at: new Date(),
              }
            : msg
        )
      );

      // Send to server
      markAsSeen(connectionSlugId, receivedMessageIds);
    },
    [socketConnected, connectionSlugId, messages, currentUserId]
  );
  const handleSendMessage = useCallback(
    //eslint-disable-next-line
    (message: any) => {
      if (!socketConnected || !message || !connectionSlugId) {
        notification.error({
          message: 'Unable to send message. Please check your connection.',
          placement: 'topRight',
        });
        return;
      }
      sendMessage(connectionSlugId, message);
    },
    [socketConnected, connectionSlugId]
  );

  //eslint-disable-next-line
  const handleReceiveMessage = useCallback((message: any) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    connectSocket();

    const handleSocketConnect = () => setSocketConnected(true);
    const handleSocketDisconnect = () => setSocketConnected(false);

    if (socket) {
      socket.on('connect', handleSocketConnect);
      socket.on('disconnect', handleSocketDisconnect);

      socket.on(SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER, handleReceiveMessage);
      socket.on(
        SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.BROADCASTER,
        handleMarkAsSeenReceived
      );
    }

    return () => {
      if (socket) {
        socket.off('connect', handleSocketConnect);
        socket.off('disconnect', handleSocketDisconnect);
        socket.off(
          SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER,
          handleReceiveMessage
        );
        socket.off(
          SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.BROADCASTER,
          handleMarkAsSeenReceived
        );
      }
      disconnectSocket();
    };
  }, [handleReceiveMessage, handleMarkAsSeenReceived]);

  // useEffect(() => {
  //   if (chatConnectedData && chatConnectedData.data) {
  //     console.log('chatConnectedData', chatConnectedData.data.slug);
  //     setConnectionId(chatConnectedData.data?.slug);
  //   }
  // }, [chatConnectedData]);

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
          onSendMessage={handleSendMessage}
          isLoading={isLoadingState}
          onMarkAsRead={handleMarkAsRead}
          //onDeleteFile={deleteMessageFile}
          //onDeleteMessage={deleteMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
