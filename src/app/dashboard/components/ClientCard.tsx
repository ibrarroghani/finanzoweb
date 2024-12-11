import React from 'react';
import CustomBadge from './CustomBadge';
import { ThreeDotIcon, UserIcon } from '@/assets/icons/bussiness-panel-icons';

interface IClientCardProps {
  name: string;
  status: boolean;
  onClick: () => void;
}

const ClientCard: React.FC<IClientCardProps> = ({ name, status, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='mb-2 flex h-20 cursor-pointer items-center justify-between gap-4 rounded-md bg-card px-4'
    >
      <div className='flex items-center gap-2 overflow-hidden'>
        <div className='h-12 w-12 flex-shrink-0 rounded-full'>
          <UserIcon />
        </div>
        <div className='flex max-w-full flex-col gap-2 overflow-hidden'>
          <p className='truncate font-semibold text-primary-dark'>{name}</p>
          {status && (
            <div className='flex items-start'>
              <CustomBadge text='Active' color='bg-success' />
            </div>
          )}
        </div>
      </div>
      <div className='flex-shrink-0'>
        <ThreeDotIcon />
      </div>
    </div>
  );
};

export default ClientCard;
