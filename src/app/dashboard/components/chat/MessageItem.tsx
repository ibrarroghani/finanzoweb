import React from 'react';
import { IMessage } from './Chat';
import FileItem from './FileItem';

interface MessageItemProps {
  message: IMessage;
  //eslint-disable-next-line
  onDeleteFile: (messageId: string, fileName: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onDeleteFile }) => {
  const isSystemMessage = message.sender === 'system';

  return (
    <div
      className={`message mb-4 flex ${isSystemMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div className='max-w-[80%] rounded-lg bg-content p-4'>
        {/* Text Message */}
        {message.text && <p className='text-small'>{message.text}</p>}

        {/* File Previews */}
        {message.files?.map((fileItem, index) => (
          <FileItem
            key={index}
            file={fileItem}
            messageId={message.id}
            onDeleteFile={onDeleteFile}
          />
        ))}

        {/* Timestamp */}
        <p className='timestamp text-extra-small mt-1'>{message.timestamp}</p>
      </div>
    </div>
  );
};

export default MessageItem;
