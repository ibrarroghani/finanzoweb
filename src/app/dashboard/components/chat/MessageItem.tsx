import React, { useEffect, useRef } from 'react';
import { getDateAndTime } from '@/utils/date-formatter';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  DoubleTickIcon,
  SingleTickIcon,
  UnavailableIcon,
} from '@/assets/icons/bussiness-panel-icons';
import FileItem from './FileItem';
import { useDashboardPageContext } from '@/app/dashboard/context/DashboardPageContext';
import { IMessage } from '@/app/dashboard/interface/chat-interface';

interface MessageItemProps {
  message: IMessage;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { handleMarkAsRead } = useDashboardPageContext();
  const messageRef = useRef<HTMLDivElement>(null);
  const slug = useSelector(
    (state: RootState) =>
      state.auth.user?.slug ??
      'user-1ee15520-a58e-11ef-878e-6045bd08fbb0-1ee15525-a58e-11ef-878e-6045bd08fbb0'
  );
  const isCurrentUserMessage = message.sender.slug === slug;

  useEffect(() => {
    if (!message.seen_at && !isCurrentUserMessage) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleMarkAsRead([message.id]);
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
  }, [message.id, message.seen_at, isCurrentUserMessage, handleMarkAsRead]);

  return (
    <div
      ref={messageRef}
      className={`message mb-4 flex ${isCurrentUserMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div className='overflow-wrap-anywhere max-w-[80%] break-words rounded-lg bg-content p-2'>
        <>
          {/* Text Message */}
          {message.message && (
            <p className='text-small h-auto w-full whitespace-pre-wrap break-words'>
              {message.message}
            </p>
          )}

          {/* File Previews */}
          {message.file && (
            <FileItem
              file={message.file}
              className='-m-2'
              isSender={isCurrentUserMessage}
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
