'use client';
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useGetConnection from '@/hooks/data-hooks/chat/use-get-connect-message';
import useGetMessages from '@/hooks/data-hooks/chat/use-get-messages';
//import { useIsFetching } from '@tanstack/react-query';
import {
  connectSocket,
  disconnectSocket,
  sendMessage,
  socket,
  markAsSeen,
  sendDocument,
  deleteDocument,
} from '@/utils/socket/socket';
import { SOCKET_EVENTS } from '@/utils/socket/constants/socketEvents';
import { notification } from 'antd';
import { useIsFetching } from '@tanstack/react-query';
import { IMessage, SeenData } from '../interface/chat-interface';

interface IDashboardPageContextValue {
  messages: IMessage[];
  isLoadingState: boolean;
  hasMore: boolean;
  connectionSlugId: string;
  // eslint-disable-next-line
  handleSendMessage: (message: string) => void;
  // eslint-disable-next-line
  handleSendDocument: (fileSlug: string) => void;
  // eslint-disable-next-line
  handleMarkAsRead: (messageIds: number[]) => void;
  // eslint-disable-next-line
  handleDeleteDocument: (slugId: string) => void;
  fetchMoreData: () => void;
}

interface IDashboardPageProviderProps {
  children: ReactNode;
}

const defaultContextValue: IDashboardPageContextValue = {
  messages: [],
  isLoadingState: false,
  hasMore: false,
  connectionSlugId: '',
  handleSendMessage: () => {},
  handleSendDocument: () => {},
  handleMarkAsRead: () => {},
  handleDeleteDocument: () => {},
  fetchMoreData: () => {},
};

export const DashboardPageContext =
  createContext<IDashboardPageContextValue>(defaultContextValue);

export const useDashboardPageContext = () => useContext(DashboardPageContext);

export const DashboardPageProvider: React.FC<IDashboardPageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [connectionSlugId, setConnectionId] = useState<string>('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [curserValue, setCurserValue] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const currentUserId = useSelector((state: RootState) => state.auth.user.slug);
  const clientSlug = useSelector((state: RootState) => state.auth.client.slug);

  const { data: chatConnectedData } = useGetConnection(clientSlug);

  const {
    data: messagesData,
    isLoading: isMessageLoading,
    refetch,
  } = useGetMessages(connectionSlugId, {
    limit: 10,
    cursor: JSON.stringify({
      column: 'user_messages.id',
      value: curserValue,
      direction: 'before',
    }),
    'reverse-data': 'no',
  });

  const isFetching = useIsFetching({ queryKey: ['getMessages'] });

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
            messageIds.includes(msg.id) && msg.sender.slug !== currentUserId
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
    (message: string) => {
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

  const handleSendDocument = useCallback(
    (fileSlug: string) => {
      if (!socketConnected || !fileSlug || !connectionSlugId) {
        notification.error({
          message: 'Unable to send message. Please check your connection.',
          placement: 'topRight',
        });
        return;
      }
      sendDocument(connectionSlugId, fileSlug);
    },
    [socketConnected, connectionSlugId]
  );

  //eslint-disable-next-line
  const handleReceiveMessage = useCallback((message: any) => {
    setMessages((prevMessages) => {
      // If the message has been deleted, filter out the message with that ID
      if (message.deleted_at) {
        return prevMessages.filter((msg) => msg.id !== message.id);
      }

      // Check if message already exists
      const isDuplicate = prevMessages.some((msg) => msg.id === message.id);
      if (isDuplicate) {
        // If it exists, update the existing message (preserve seen_at status)
        return prevMessages.map((msg) =>
          msg.id === message.id ? { ...message, seen_at: msg.seen_at } : msg
        );
      }
      // Add new message at the beginning
      return [message, ...prevMessages];
    });
  }, []);

  // Combine socket event handlers into a single useEffect
  useEffect(() => {
    connectSocket();

    const handleSocketConnect = () => setSocketConnected(true);
    const handleSocketDisconnect = () => setSocketConnected(false);

    if (socket) {
      const events = {
        connect: handleSocketConnect,
        disconnect: handleSocketDisconnect,
        [SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER]: handleReceiveMessage,
        [SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.BROADCASTER]:
          handleMarkAsSeenReceived,
        [SOCKET_EVENTS.MESSAGE.SEND_DOCUMENT.BROADCASTER]: handleReceiveMessage,
        [SOCKET_EVENTS.MESSAGE.DELETE_DOCUMENT.BROADCASTER]:
          handleReceiveMessage,
      };

      // Register all events
      Object.entries(events).forEach(([event, handler]) => {
        socket?.on(event, handler);
      });

      // Cleanup function
      return () => {
        Object.entries(events).forEach(([event, handler]) => {
          socket?.off(event, handler);
        });
        disconnectSocket();
      };
    }
  }, [handleReceiveMessage, handleMarkAsSeenReceived]);

  useEffect(() => {
    if (clientSlug) {
      setMessages([]);
      setCurserValue(0);
      setConnectionId('');
      setHasMore(false);
    }
  }, [clientSlug]);

  useEffect(() => {
    if (chatConnectedData?.data) {
      const newConnectionId = chatConnectedData.data.thread?.slug;
      const lastMessageId = chatConnectedData.data.lastMessage?.id;

      // Handle both initial load and connection changes
      if (!connectionSlugId || newConnectionId !== connectionSlugId) {
        setConnectionId(newConnectionId);
        setCurserValue(lastMessageId ? lastMessageId + 1 : 0);
      }
    }
  }, [chatConnectedData, connectionSlugId, refetch]);

  useEffect(() => {
    if (messagesData && messagesData.data) {
      setMessages((prevMessages) => {
        // Combine previous and new messages
        const allMessages = [...prevMessages, ...messagesData.data];

        // Remove duplicates based on message id
        const uniqueMessages = allMessages.filter(
          (message, index, self) =>
            index === self.findIndex((m) => m.id === message.id)
        );

        // Sort messages by creation date in descending order (newest first)
        return uniqueMessages.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      //eslint-disable-next-line
      const metaData = messagesData as any;

      setCurserValue(metaData.meta.nextCursor?.value ?? 0);
      setHasMore(metaData.meta.hasMore);
    }
  }, [messagesData]);

  const fetchMoreData = () => {
    refetch();
  };

  const handleDeleteDocument = useCallback(
    (slugId: string) => {
      if (!socketConnected || !slugId || !connectionSlugId) {
        notification.error({
          message: 'Unable to delete. Please check your connection.',
          placement: 'topRight',
        });
        return;
      }
      deleteDocument(connectionSlugId, slugId);
    },
    [socketConnected, connectionSlugId]
  );

  const isLoadingState = isMessageLoading || isFetching > 0;

  const contextValue: IDashboardPageContextValue = {
    messages,
    isLoadingState,
    hasMore,
    connectionSlugId,
    handleSendMessage,
    handleSendDocument,
    handleMarkAsRead,
    handleDeleteDocument,
    fetchMoreData,
  };

  return (
    <DashboardPageContext.Provider value={contextValue}>
      {children}
    </DashboardPageContext.Provider>
  );
};
