/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import {
  connectSocket,
  sendMessage,
  markAsSeen,
  disconnectSocket,
  joinThread,
  socket,
} from '../../socket/socket'; // Import the socket functions
import { SOCKET_EVENTS } from '../../socket/constants/socketEvents';

interface SeenData {
  messageIds: number[];
  seenBy: {
    id: string;
    name: string;
    // add other user fields you need
  };
}

const MessagingPage = () => {
  const token = localStorage.getItem('dummyAuthToken');
  const [message, setMessage] = useState('');
  const [threadSlug, setThreadSlug] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [messageIds, setMessageIds] = useState('');
  const [threadJoined, setThreadJoined] = useState(false);
  const [messageSeenByMe, setMessageSeenByMe] = useState<SeenData[]>([]);
  const [messageSeenByOthers, setMessageSeenByOthers] = useState<SeenData[]>(
    []
  );

  useEffect(() => {
    connectSocket();

    const handleSocketConnect = () => setSocketConnected(true);
    const handleSocketDisconnect = () => setSocketConnected(false);

    if (socket) {
      socket.on('connect', handleSocketConnect);
      socket.on('disconnect', handleSocketDisconnect);

      socket.on(SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER, handleReceiveMessage);
      socket.on(
        SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.BROADCASTER,
        handleMarkAsSeenReceived
      );
    }

    return () => {
      if (socket) {
        socket.off('connect', handleSocketConnect);
        socket.off('disconnect', handleSocketDisconnect);
        socket.off(
          SOCKET_EVENTS.MESSAGE.SEND.BROADCASTER,
          handleReceiveMessage
        );
        socket.off(
          SOCKET_EVENTS.MESSAGE.MARK_AS_SEEN.BROADCASTER,
          handleMarkAsSeenReceived
        );
      }
      disconnectSocket();
    };
    //eslint-disable-next-line
  }, []);

  const handleReceiveMessage = (message: any) => {
    setReceivedMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleMarkAsSeenReceived = (result: { data: SeenData }) => {
    //eslint-disable-next-line
    console.log('Marked as seen:', result);
    const seenData = result.data;

    //eslint-disable-next-line
    console.log('seenData.seenBy.id', seenData.seenBy.id);
    //eslint-disable-next-line
    console.log('token', token);
    //eslint-disable-next-line
    console.log('token?.replace("user-", "")', token?.replace('user-', ''));

    //eslint-disable-next-line
    console.log(
      'seenData.seenBy.id.toString() === token?.replace("user-", "")',
      seenData.seenBy.id.toString() === token?.replace('user-', '')
    );

    if (seenData.seenBy.id.toString() === token?.replace('user-', '')) {
      setMessageSeenByMe((prev) => [...prev, seenData]);
    } else {
      setMessageSeenByOthers((prev) => [...prev, seenData]);
    }
  };

  const handleSendMessage = () => {
    if (!socketConnected) {
      alert('Socket is not connected. Please try again later.');
      return;
    }

    if (!message || !threadSlug) {
      alert('Please provide both message and threadSlug');
      return;
    }

    sendMessage(threadSlug, message);
    setMessage('');
  };

  const handleMarkMessagesAsSeen = () => {
    const ids = messageIds
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    if (ids.length > 0) {
      markAsSeen(threadSlug, ids);
      setMessageIds('');
    } else {
      alert('Please provide valid message IDs');
    }
  };

  const handleJoinThread = () => {
    if (!socketConnected || !threadSlug) {
      alert('Socket is not connected or threadSlug is empty.');
      return;
    }

    joinThread(threadSlug, (response) => {
      if (response.success) {
        setThreadJoined(true);
        alert(response.message); // Display the success message received from backend
      } else {
        alert(response.message); // Display the error message received from backend
      }
    });
  };

  const handleResetThreadSlug = () => {
    setThreadSlug('');
    setThreadJoined(false);
  };

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <h1 className='mb-4 text-center text-xl font-bold'>
        {token ?? 'No User'}
      </h1>
      <h2 className='mb-4 text-2xl font-bold'>Messaging</h2>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Enter threadSlug'
          value={threadSlug}
          onChange={(e) => setThreadSlug(e.target.value)}
          className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <button
        onClick={handleJoinThread}
        className='mb-4 w-full rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600'
      >
        Join Thread
      </button>

      <button
        onClick={handleResetThreadSlug}
        className='mb-4 w-full rounded-lg bg-gray-500 p-2 text-white hover:bg-gray-600'
      >
        Reset ThreadSlug
      </button>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Type a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <button
        onClick={handleSendMessage}
        className='mb-4 w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600'
      >
        Send Message
      </button>

      <h3 className='mb-2 text-xl font-semibold'>Received Messages</h3>
      <ul className='mb-4'>
        {receivedMessages.map((msg, index) => (
          <li key={index} className='mb-2 rounded-lg bg-gray-100 p-2'>
            {JSON.stringify(msg)}
          </li>
        ))}
      </ul>

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

      <p className='mt-4 text-center'>
        {socketConnected ? (
          <span className='text-green-500'>Socket Connected</span>
        ) : (
          <span className='text-red-500'>Socket Disconnected</span>
        )}
      </p>

      {messageSeenByMe.length > 0 && (
        <>
          <h3 className='mb-2 text-xl font-semibold'>Messages Seen By Me</h3>
          <ul className='mb-4'>
            {messageSeenByMe.map((seenData, index) => (
              <li key={index} className='mb-2 rounded-lg bg-gray-100 p-2'>
                <div>
                  <strong>Message IDs:</strong> {seenData.messageIds.join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {messageSeenByOthers.length > 0 && (
        <>
          <h3 className='mb-2 text-xl font-semibold'>
            Messages Seen by Others
          </h3>
          <ul className='mb-4'>
            {messageSeenByOthers.map((seenData, index) => (
              <li key={index} className='mb-2 rounded-lg bg-gray-100 p-2'>
                <div>
                  <strong>Seen by ID:</strong> {seenData.seenBy.id}
                </div>
                <div>
                  <strong>Message IDs:</strong> {seenData.messageIds.join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {threadJoined && (
        <p className='mt-2 text-center text-green-500'>
          Successfully joined the thread: {threadSlug}
        </p>
      )}
    </div>
  );
};

export default MessagingPage;
