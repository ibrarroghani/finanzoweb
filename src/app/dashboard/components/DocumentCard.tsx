import {
  DownloadIcon,
  EditIcon,
  ReadingIcon,
} from '@/assets/icons/bussiness-panel-icons';
import React from 'react';

const DocumentCard = () => {
  return (
    <div className='rounded-small mt-2 flex w-full justify-between border border-border-primary bg-primary-light p-4'>
      <p className='text-large font-semibold text-primary-dark'>
        Document Name
      </p>
      <div className='flex gap-4'>
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-content'>
          <EditIcon />
        </span>
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-content'>
          <ReadingIcon />
        </span>
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-content'>
          <DownloadIcon />
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;
