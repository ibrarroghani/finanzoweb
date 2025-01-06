const EVENTS = {
  MESSAGE_SEND: 'message:send',
  MESSAGE_SEEN: 'message:seen',
  USER_JOINED_THREAD: 'user:joined_thread', // Event when a user joins a thread
  USER_JOINED_THREAD_CONFIRMATION: 'user:joined_thread_confirmation', // Confirmation event for user joining a thread
};

export const SOCKET_EVENTS = {
  GENERAL: {
    PING: 'ping', // General ping event
  },
  MESSAGE: {
    SEND: {
      LISTENER: `${EVENTS.MESSAGE_SEND}:sent`, // Example: "message:send:sent"
      BROADCASTER: `${EVENTS.MESSAGE_SEND}:new`, // Example: "message:send:new"
    },
    MARK_AS_SEEN: {
      LISTENER: `${EVENTS.MESSAGE_SEEN}:mark`, // Example: "message:seen:mark"
      BROADCASTER: `${EVENTS.MESSAGE_SEEN}:confirmed`, // Example: "message:seen:confirmed"
    },
  },
  USER: {
    JOIN_THREAD: {
      LISTENER: `${EVENTS.USER_JOINED_THREAD}:listen`, // Listener for when a user joins the thread
      BROADCASTER: `${EVENTS.USER_JOINED_THREAD}:new`, // Broadcaster to notify others that a user joined the thread
    },
    JOIN_THREAD_CONFIRMATION: {
      LISTENER: `${EVENTS.USER_JOINED_THREAD_CONFIRMATION}:listen`, // Listener for confirmation when a user joins the thread
      BROADCASTER: `${EVENTS.USER_JOINED_THREAD_CONFIRMATION}:confirmed`, // Broadcaster to send confirmation to the joining user
    },
  },
};
