/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './constants/socketEvents';
import { handleSocketErrors } from './error/handler';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

let socket: Socket | null = null;

const connectSocket = () => {
  const token = localStorage.getItem('dummyAuthToken'); // Retrieve the token (ensure it's available in localStorage)

  if (!token) {
    console.log('No token found. Cannot connect.');
    return;
  }

  // If the socket is already connected, don't create a new connection
  if (socket?.connected) {
    console.log('Already connected to the socket.');
    return;
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket'], // Use WebSocket transport for better compatibility
    auth: {
      token, // Pass the token as an authentication parameter
    },
    reconnectionAttempts: 5, // Try to reconnect 5 times
    reconnectionDelay: 1000, // Delay between reconnections (in ms)
    reconnectionDelayMax: 5000, // Max delay between reconnections (in ms)
  });

  socket.on('connect', () => {
    console.log('Socket connected: ' + socket?.id);
  });

  // Handle socket errors globally
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

  socket.on(SOCKET_EVENTS.USER.JOIN_THREAD.BROADCASTER, (data: any) => {
    console.log(data.message);
    // Handle the message when a user joins the thread
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
    // Optionally, handle cleanup tasks when disconnected
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    // Optionally, handle specific errors
  });

  socket.on('reconnect_failed', () => {
    console.error('Socket reconnection failed');
    // Optionally, notify the user or show an error message
  });
};

const joinThread = (threadSlug: string, callback: (response: any) => void) => {
  if (!socket || !threadSlug) {
    callback({
      success: false,
      message: 'Socket not connected or threadSlug is empty.',
    });
    return;
  }

  // Emit the event to join the thread (room)
  socket.emit(SOCKET_EVENTS.USER.JOIN_THREAD.LISTENER, { threadSlug });

  // Listen for the confirmation event from the backend
  socket.on(
    SOCKET_EVENTS.USER.JOIN_THREAD_CONFIRMATION.BROADCASTER,
    (response: any) => {
      console.log('response', response);
      if (response && response.message) {
        // Success: Join confirmation received
        callback({
          success: true,
          message: response.message,
        });
      } else {
        // Failure: Something went wrong
        callback({
          success: false,
          message: 'Failed to join the thread.',
        });
      }
    }
  );
};

// Send a message
const sendMessage = (threadSlug: string, message: string) => {
  if (!socket?.connected) {
    console.log('Socket is not connected');
    return;
  }

  socket.emit(SOCKET_EVENTS.MESSAGE.SEND.LISTENER, { threadSlug, message });
};

// Mark messages as seen
const markAsSeen = (threadSlug: string, messageIds: number[]) => {
  if (!socket?.connected) {
    console.log('Socket is not connected');
    return;
  }

  socket.emit(SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.LISTENER, {
    threadSlug,
    messageIds,
  });
};

// Disconnect socket gracefully
const disconnectSocket = () => {
  if (socket) {
    socket.off(); // Remove all event listeners
    socket.disconnect(); // Disconnect the socket
    socket = null;
  }
};

export {
  connectSocket,
  joinThread,
  sendMessage,
  markAsSeen,
  disconnectSocket,
  socket,
};
