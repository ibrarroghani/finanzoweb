import React, { useState } from 'react';
import Image from 'next/image';
import {
  AttachmentIcon,
  DeleteIcon,
  DownloadIconTwo,
} from '@/assets/icons/bussiness-panel-icons';

import Link from 'next/link';
import { Modal, Skeleton } from 'antd';
import { useDashboardPageContext } from '@/app/dashboard/context/DashboardPageContext';
import { File } from '@/app/dashboard/interface/chat-interface';

interface FileItemProps {
  file: File;
  messageStatus?: string;
  className?: string;
  isSender?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  className,
  file,
  messageStatus,
  isSender,
}) => {
  const { handleDeleteDocument } = useDashboardPageContext();
  const isImage = file.file_type === 'image';
  const [loading, setLoading] = useState(true);

  const handleDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this file?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleDeleteDocument(file.slug);
      },
    });
  };

  return (
    <div className={`mb-2 ${className} rounded-medium`}>
      {messageStatus === 'deleted' ? (
        <p className='text-small'>This file is deleted</p>
      ) : (
        <>
          {isImage ? (
            <>
              <div className='relative'>
                {loading && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <Skeleton.Image active={loading} />
                  </div>
                )}
                <Image
                  src={file.file_url}
                  alt='preview'
                  height={250}
                  width={250}
                  className='rounded object-cover p-2'
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                />
              </div>
            </>
          ) : (
            <div className='flex flex-col gap-2 px-3'>
              <div className='my-3 flex gap-2'>
                <span>
                  <AttachmentIcon />
                </span>
                <span className='text-small h-auto w-full whitespace-pre-wrap break-words'>
                  {file.original_name}
                </span>
              </div>
            </div>
          )}
          <div className='mx-2 flex gap-1'>
            {isSender && (
              <button
                onClick={handleDeleteConfirm}
                className='text-small flex items-center gap-1 rounded-full bg-primary-dark px-3 py-1 text-primary-light'
              >
                <span>
                  <DeleteIcon />
                </span>
                Delete
              </button>
            )}

            {/* Download Link */}
            <Link
              href={file.file_url}
              download={file.original_name}
              className='text-small flex items-center gap-1 rounded-full bg-primary-dark px-3 py-1 text-primary-light'
            >
              <span>
                <DownloadIconTwo />
              </span>
              Download
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FileItem;
