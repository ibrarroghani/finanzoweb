import React from 'react';
import Image from 'next/image';
import { DownloadIconTwo } from '@/assets/icons/bussiness-panel-icons';

interface FileItemProps {
  file: { file: File; url: string };
  messageStatus: string;
  className?: string;
}

const FileItem: React.FC<FileItemProps> = ({
  className,
  file,
  messageStatus,
}) => {
  const isImage = file.file.type.startsWith('image/');

  return (
    <div className={`mb-2 ${className} rounded-medium`}>
      {messageStatus === 'deleted' ? (
        <p className='text-small'>This file is deleted</p>
      ) : (
        <>
          {isImage ? (
            <Image
              src={file.url}
              alt='preview'
              height={250}
              width={250}
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
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileItem;
