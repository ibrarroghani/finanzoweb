import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './constants/socketEvents';
import { handleSocketErrors } from './error/handler';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

let socket: Socket;

const connectSocket = () => {
  const token = localStorage.getItem('dummyAuthToken'); // Retrieve the token (ensure it's available in localStorage)

  if (!token) {
    console.log('No token found. Cannot connect.');
    return;
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket'], // Use WebSocket transport for better compatibility
    auth: {
      token, // Pass the token as an authentication parameter
    },
  });

  socket.on('connect', () => {
    console.log('Socket connected: ' + socket.id);
  });

  // Call the handleSocketErrors function to listen for error events
  handleSocketErrors(socket);

  socket.on(SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER, (message: unknown) => {
    console.log('New message received:', message);
    // Handle the message received event
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

export { connectSocket, sendMessage, markAsSeen, disconnectSocket, socket };
