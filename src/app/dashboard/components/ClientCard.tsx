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
      className='bg-cardBackground mb-2 flex h-20 cursor-pointer items-center justify-between gap-4 rounded-md px-4'
    >
      <div className='flex items-center gap-2 overflow-hidden'>
        <div className='h-12 w-12 flex-shrink-0 rounded-full'>
          <UserIcon />
        </div>
        <div className='flex max-w-full flex-col gap-2 overflow-hidden'>
          <p className='truncate font-semibold'>{name}</p>
          {status && (
            <p className='flex w-auto'>
              <CustomBadge text='Active' color='#3FA75A' />
            </p>
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
