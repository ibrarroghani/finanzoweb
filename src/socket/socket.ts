import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './constants/socketEvents';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

let socket: Socket;

const connectSocket = () => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'], // Use WebSocket transport for better compatibility
  });

  socket.on('connect', () => {
    console.log('Socket connected: ' + socket.id);
  });

  socket.on(SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER, (message: unknown) => {
    console.log('New message received:', message);
    // Handle the message received event, e.g., display it in UI
  });

  socket.on(
    SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.BROADCASTER,
    (result: unknown) => {
      console.log('Message marked as seen:', result);
      // Handle marking as seen event
    }
  );
};

const sendMessage = (threadSlug: string, message: string) => {
  if (!socket) {
    console.log('Socket is not connected');
    return;
  }

  socket.emit(SOCKET_EVENTS.MESSAGE.SEND.LISTENER, { threadSlug, message });
};

const markAsSeen = (messageIds: number[]) => {
  if (!socket) {
    console.log('Socket is not connected');
    return;
  }

  socket.emit(SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.LISTENER, messageIds);
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export { connectSocket, sendMessage, markAsSeen, disconnectSocket };
