import React from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import { DownloadIconTwo } from '@/assets/icons/bussiness-panel-icons';

interface FileItemProps {
  file: { file: File; url: string };
  messageId: string;
  //eslint-disable-next-line
  onDeleteFile: (messageId: string, fileName: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  messageId,
  onDeleteFile,
}) => {
  const isImage = file.file.type.startsWith('image/');

  const showDeleteConfirm = (messageId: string, fileToDelete: File) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this file?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDeleteFile(messageId, fileToDelete.name);
      },
    });
  };

  return (
    <div className='mt-2'>
      {isImage ? (
        <Image
          src={file.url}
          alt='preview'
          width={150}
          height={150}
          className='rounded object-cover p-2'
        />
      ) : (
        <div className='flex flex-col gap-2'>
          <div className=''>
            <span className='text-large'>{file.file.name}</span>
          </div>
          <div className='flex gap-1'>
            {/* Download Link */}
            <a
              href={file.url}
              download={file.file.name}
              className='text-small flex items-center gap-1 rounded-full bg-primary-dark px-3 py-1 text-primary-light'
            >
              <span>
                <DownloadIconTwo />
              </span>
              Download
            </a>
            {/* Delete Button */}
            <button
              className='ml-2 rounded-full bg-primary-dark px-3 py-1 text-primary-light'
              onClick={() => showDeleteConfirm(messageId, file.file)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileItem;
