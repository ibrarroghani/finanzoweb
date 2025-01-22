import React, { useEffect, useRef } from 'react';
import { IMessage } from './Chat';
//import FileItem from './FileItem';
import { getDateAndTime } from '@/utils/date-formatter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  DoubleTickIcon,
  SingleTickIcon,
  UnavailableIcon,
} from '@/assets/icons/bussiness-panel-icons';
import FileItem from './FileItem';
//import { Modal } from 'antd';

interface MessageItemProps {
  message: IMessage;

  //eslint-disable-next-line
  onMarkAsRead: (messageId: number[]) => void;

  //eslint-disable-next-line
  onDeleteFile: (slugId: string) => void;

  //eslint-disable-next-line
  //onDeleteMessage: (messageId: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onMarkAsRead,
  onDeleteFile,
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!message.seen_at && !isSystemMessage) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onMarkAsRead([message.id]);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      if (messageRef.current) {
        observer.observe(messageRef.current);
      }

      return () => observer.disconnect();
    }
  }, [message.id, message.seen_at, isSystemMessage, onMarkAsRead]);

  return (
    <div
      ref={messageRef}
      className={`message mb-4 flex ${isSystemMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className='overflow-wrap-anywhere max-w-[80%] break-words rounded-lg bg-content p-2'
        // {...(message.status !== 'deleted' && {
        //   onClick: () => showDeleteConfirm(message.id),
        // })}
      >
        {/* {message.seen_at === 'deleted' ? (
          <p className='text-small capitalize'>This Message is deleted</p>
        ) : ( */}
        <>
          {/* Text Message */}
          {message.message && (
            <p className='text-small h-auto w-full whitespace-pre-wrap break-words'>
              {message.message}
            </p>
          )}

          {/* File Previews */}
          {/* {message.files?.map((fileItem, index) => (
              <FileItem
                key={index}
                file={fileItem}
                messageStatus={message.status}
                className='-m-2'
              />
            ))} */}

          {/* File Previews */}
          {message.file && (
            <FileItem
              file={message.file}
              // messageStatus={message.status}
              className='-m-2'
              isSender={isSystemMessage}
              onDeleteFile={onDeleteFile}
            />
          )}

          {message.comment && (
            <div className='flex gap-2'>
              <span>
                <UnavailableIcon />
              </span>
              <p className='text-small h-auto w-full whitespace-pre-wrap break-words'>
                {message.comment}
              </p>
            </div>
          )}

          {/* Timestamp */}
          <div className='mt-1 flex justify-end gap-2'>
            {message.seen_at ? (
              <p>
                <DoubleTickIcon />
              </p>
            ) : (
              <p>
                <SingleTickIcon />
              </p>
            )}
            <p className='timestamp text-extra-small'>
              {getDateAndTime(message.created_at)}
            </p>
          </div>
        </>
        {/* )} */}
      </div>
    </div>
  );
};

export default MessageItem;
