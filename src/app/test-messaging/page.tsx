/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import {
  connectSocket,
  sendMessage,
  markAsSeen,
  disconnectSocket,
  socket,
} from '../../socket/socket'; // Import the socket functions
import { SOCKET_EVENTS } from '../../socket/constants/socketEvents';

const MessagingPage = () => {
  const [message, setMessage] = useState('');
  const [threadSlug, setThreadSlug] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Connect the socket when the component mounts
    connectSocket(); // This will set up the socket connection and listeners

    // Listen for new messages and mark-as-seen events
    const handleMessage = (message: any) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleMarkAsSeen = (result: any) => {
      console.log('Marked as seen:', result);
      // Handle the result of marking as seen (e.g., update UI state)
    };

    socket.on(SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER, handleMessage);
    socket.on(SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.BROADCASTER, handleMarkAsSeen);

    // Cleanup on unmount
    return () => {
      disconnectSocket(); // Disconnect the socket when the component unmounts
    };
  }, []);

  const handleSendMessage = () => {
    if (!message || !threadSlug) {
      alert('Please provide both message and threadSlug');
      return;
    }

    sendMessage(threadSlug, message); // Send the message using the socket
    setMessage(''); // Reset the message input field
  };

  const handleMarkMessagesAsSeen = (messageIds: number[]) => {
    markAsSeen(messageIds); // Mark the given message IDs as seen
  };

  return (
    <div>
      <h2>Messaging</h2>

      {/* Input for message */}
      <input
        type='text'
        placeholder='Type a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Input for thread slug */}
      <input
        type='text'
        placeholder='Enter threadSlug'
        value={threadSlug}
        onChange={(e) => setThreadSlug(e.target.value)}
      />

      {/* Send Message button */}
      <button onClick={handleSendMessage}>Send Message</button>

      {/* Display received messages */}
      <h3>Received Messages</h3>
      <ul>
        {receivedMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      {/* Mark Messages as Seen button */}
      <button onClick={() => handleMarkMessagesAsSeen([1, 2, 3])}>
        Mark Messages 1, 2, 3 as Seen
      </button>
    </div>
  );
};

export default MessagingPage;
