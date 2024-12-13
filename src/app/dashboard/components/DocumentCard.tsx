import {
  DownloadIcon,
  EditIcon,
  ReadingIcon,
} from '@/assets/icons/bussiness-panel-icons';
import React from 'react';

interface IDocument {
  id: number;
  title: string;
}

interface IDocumentCardProps {
  data: IDocument;
}

const DocumentCard: React.FC<IDocumentCardProps> = ({ data }) => {
  const { title } = data;

  return (
    <div className='card card-border mt-2 flex w-full justify-between p-4'>
      <p className='text-large card-title'>{title}</p>
      <div className='flex gap-4'>
        <span className='document-icon'>
          <EditIcon />
        </span>
        <span className='document-icon'>
          <ReadingIcon />
        </span>
        <span className='document-icon'>
          <DownloadIcon />
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;
