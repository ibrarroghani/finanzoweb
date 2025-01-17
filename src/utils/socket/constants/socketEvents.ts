export const SOCKET_EVENTS = {
  GENERAL: {
    PING: 'ping', // General ping event
  },
  MESSAGE: {
    SEND: {
      LISTENER: 'message:send:new',
      BROADCASTER: 'message:send:sent',
    },
    SEND_DOCUMENT: {
      LISTENER: 'message:send:document:new',
      BROADCASTER: 'message:send:document:sent',
    },
    MARK_AS_SEEN: {
      LISTENER: 'message:seen:mark',
      BROADCASTER: 'message:seen:marked',
    },
  },
  USER: {
    JOIN_THREAD: {
      LISTENER: 'user:joined_thread:listen',
      BROADCASTER: 'user:joined_thread:broadcast',
    },
    JOIN_THREAD_CONFIRMATION: {
      LISTENER: 'user:joined_thread_confirmation:listen', // Listener for confirmation when a user joins the thread
      BROADCASTER: 'user:joined_thread_confirmation:broadcast', // Broadcaster to send confirmation to the joining user
    },
  },
} as const;
