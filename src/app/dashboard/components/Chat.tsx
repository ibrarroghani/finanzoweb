import React, { useEffect, useRef } from 'react';

import {
  ImageUploadIcon,
  MessageSendIcon,
} from '@/assets/icons/bussiness-panel-icons';

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className='mt-2 min-h-screen w-[35%]'>
      <div className='sticky top-0 flex h-[calc(100vh-200px)] w-full flex-col justify-between rounded-3 bg-primary-light py-6 pr-2'>
        {/* Chat Messages Section */}
        <div
          ref={messagesEndRef}
          className='custom-scrollbar flex flex-col overflow-y-auto px-4'
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === 'system'
                  ? 'items-end justify-end'
                  : 'items-start'
              }`}
            >
              <div className='max-w-[80%] rounded-lg bg-content p-4'>
                <p className='text-12'>{message.text}</p>
                <p className='text-10 text-gray-500'>{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className='p-4'>
          <div className='relative flex w-full items-center'>
            {/* Input Field */}
            <input
              type='text'
              placeholder='Enter Your Message'
              className='w-full max-w-full rounded-3 border border-border-primary py-4 pl-4 pr-24 text-sm focus:outline-none'
            />

            {/* Send Icon */}
            <button className='absolute right-12 top-1/2 flex h-8 w-8 shrink-0 -translate-y-1/2 items-center justify-center'>
              <MessageSendIcon />
            </button>

            {/* Upload Icon */}
            <button className='absolute right-2 top-1/2 flex h-8 w-8 shrink-0 -translate-y-1/2 items-center justify-center'>
              <ImageUploadIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

const messages = [
  {
    id: '1',
    text: 'Hello!',
    timestamp: '6:00, 8/11/2024',
    sender: 'system',
    receiver: 'user',
  },
  {
    id: '2',
    text: 'How can I help you?',
    timestamp: '6:01, 8/11/2024',
    sender: 'system',
    receiver: 'user',
  },
  {
    id: '3',
    text: 'I need assistance.',
    timestamp: '6:02, 8/11/2024',
    sender: 'user',
    receiver: 'system',
  },
  {
    id: '4',
    text: 'Can you help me?',
    timestamp: '6:02, 8/11/2024',
    sender: 'user',
    receiver: 'system',
  },

  {
    id: '5',
    text: 'Yes,of course.What assistance do you need?',
    timestamp: '6:02, 8/11/2024',
    sender: 'system',
    receiver: 'user',
  },
];
