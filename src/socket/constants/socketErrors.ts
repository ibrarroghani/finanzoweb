export const SOCKET_ERRORS = {
  AUTHENTICATION: {
    UNAUTHORIZED: 'socket:error:unauthorized', // User not authenticated
    FORBIDDEN: 'socket:error:forbidden', // User doesn't have permission for the action
  },
  MESSAGE: {
    INVALID_DATA: 'socket:error:message:invalidData', // Invalid message data received
    SEND_FAILED: 'socket:error:message:sendFailed', // Error while sending a message
    MARK_AS_SEEN_FAILED: 'socket:error:message:markAsSeenFailed', // Error while marking message as seen
  },
  GENERAL: {
    INTERNAL_SERVER: 'socket:error:internalServer', // General internal server error
    CONNECTION_FAILED: 'socket:error:connectionFailed', // Socket connection failure
  },
};
