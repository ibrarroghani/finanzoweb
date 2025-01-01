import React from 'react';
import { IMessage } from './Chat';
//import FileItem from './FileItem';
import { getDateAndTime } from '@/utils/date-formatter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
//import { Modal } from 'antd';

interface MessageItemProps {
  message: IMessage;

  //eslint-disable-next-line
  //onDeleteFile: (messageId: string, fileName: string) => void;

  //eslint-disable-next-line
  //onDeleteMessage: (messageId: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  // onDeleteMessage,
}) => {
  const slug = useSelector(
    (state: RootState) =>
      state.auth.user?.slug ??
      'user-1ee15520-a58e-11ef-878e-6045bd08fbb0-1ee15525-a58e-11ef-878e-6045bd08fbb0'
  );
  const isSystemMessage = message.sender.slug === slug;
  // const isFileMessage = (message.files ?? [])?.length > 0;

  // const showDeleteConfirm = (messageId: string) => {
  //   if (message.sender !== 'client') return;

  //   Modal.confirm({
  //     title: 'Are you sure you want to delete this message?',
  //     content: 'This action cannot be undone.',
  //     okText: 'Delete',
  //     okType: 'danger',
  //     cancelText: 'Cancel',
  //     onOk() {
  //       onDeleteMessage(messageId);
  //     },
  //   });
  // };

  return (
    <div
      className={`message mb-4 flex ${isSystemMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className='max-w-[80%] rounded-lg bg-content p-2'
        // {...(message.status !== 'deleted' && {
        //   onClick: () => showDeleteConfirm(message.id),
        // })}
      >
        {message.seen_at === 'deleted' ? (
          <p className='text-small capitalize'>This Message is deleted</p>
        ) : (
          <>
            {/* Text Message */}
            {message.message && <p className='text-small'>{message.message}</p>}

            {/* File Previews */}
            {/* {message.files?.map((fileItem, index) => (
              <FileItem
                key={index}
                file={fileItem}
                messageStatus={message.status}
                className='-m-2'
              />
            ))} */}

            {/* Timestamp */}
            <p className='timestamp text-extra-small mt-1'>
              {getDateAndTime(message.created_at)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
