import React from 'react';
import Image from 'next/image';
import { Modal } from 'antd';

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
    <div className='file-preview mt-2'>
      {isImage ? (
        <Image
          src={file.url}
          alt='preview'
          width={150}
          height={150}
          className='rounded object-cover p-2'
        />
      ) : (
        <div className='file-box flex flex-col items-center'>
          <div className='file-icon flex h-12 w-12 items-center justify-center rounded border'>
            <span className='text-xs'>{file.file.name}</span>
          </div>
          <div className='flex gap-2'>
            {/* Download Link */}
            <a
              href={file.url}
              download={file.file.name}
              className='ml-2 text-blue-500 hover:underline'
            >
              Download
            </a>
            {/* Delete Button */}
            <button
              className='ml-2 text-red-500 hover:underline'
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
