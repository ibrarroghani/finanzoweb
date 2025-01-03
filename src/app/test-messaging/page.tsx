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
  const [messageIds, setMessageIds] = useState('');

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

    // Setting the socket connection status
    socket.on('connect', () => {
      setSocketConnected(true);
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
    });

    // Cleanup on unmount
    return () => {
      disconnectSocket(); // Disconnect the socket when the component unmounts
    };
  }, []);

  const handleSendMessage = () => {
    if (!socketConnected) {
      alert('Socket is not connected. Please try again later.');
      return;
    }

    if (!message || !threadSlug) {
      alert('Please provide both message and threadSlug');
      return;
    }

    sendMessage(threadSlug, message); // Send the message using the socket
    setMessage(''); // Reset the message input field
  };

  const handleMarkMessagesAsSeen = () => {
    const ids = messageIds
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    if (ids.length > 0) {
      markAsSeen(ids); // Mark the given message IDs as seen
      setMessageIds(''); // Reset the message IDs input field
    } else {
      alert('Please provide valid message IDs');
    }
  };

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <h2 className='mb-4 text-2xl font-bold'>Messaging</h2>

      {/* Input for message */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Type a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Input for thread slug */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Enter threadSlug'
          value={threadSlug}
          onChange={(e) => setThreadSlug(e.target.value)}
          className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Send Message button */}
      <button
        onClick={handleSendMessage}
        className='mb-4 w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600'
      >
        Send Message
      </button>

      {/* Display received messages */}
      <h3 className='mb-2 text-xl font-semibold'>Received Messages</h3>
      <ul className='mb-4'>
        {receivedMessages.map((msg, index) => (
          <li key={index} className='mb-2 rounded-lg bg-gray-100 p-2'>
            {msg}
          </li>
        ))}
      </ul>

      {/* Mark Messages as Seen form */}
      <div className='mb-4'>
        <h3 className='mb-2 text-xl font-semibold'>Mark Messages as Seen</h3>
        <input
          type='text'
          placeholder='Enter message IDs (comma separated)'
          value={messageIds}
          onChange={(e) => setMessageIds(e.target.value)}
          className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={handleMarkMessagesAsSeen}
          className='mt-2 w-full rounded-lg bg-green-500 p-2 text-white hover:bg-green-600'
        >
          Mark as Seen
        </button>
      </div>

      {/* Display socket connection status */}
      <p className='mt-4 text-center'>
        {socketConnected ? (
          <span className='text-green-500'>Socket Connected</span>
        ) : (
          <span className='text-red-500'>Socket Disconnected</span>
        )}
      </p>
    </div>
  );
};

export default MessagingPage;
