const EVENTS = {
  MESSAGE_SEND: 'message:send',
  MESSAGE_SEEN: 'message:seen',
};

export const SOCKET_EVENTS = {
  MESSAGE: {
    SEND: {
      // Listener: This is the event to listen for when a message is sent
      LISTENER: `${EVENTS.MESSAGE_SEND}:sent`, // Example: "message:send:sent"

      // Broadcaster: This is the event to broadcast when a message is received
      BROADCASTER: `${EVENTS.MESSAGE_SEND}:new`, // Example: "message:send:new"
    },
    MARK_AS_SEEN: {
      // Listener: This is the event to listen for when a message should be marked as seen
      LISTENER: `${EVENTS.MESSAGE_SEEN}:mark`, // Example: "message:seen:mark"

      // Broadcaster: This is the event to broadcast when the message is marked as seen
      BROADCASTER: `${EVENTS.MESSAGE_SEEN}:confirmed`, // Example: "message:seen:confirmed"
    },
  },
};
