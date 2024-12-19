import React from 'react';
import CustomBadge from './CustomBadge';
import { ThreeDotIcon, UserIcon } from '@/assets/icons/bussiness-panel-icons';

interface IClient {
  id: number;
  name: string;
  status: boolean;
}
interface IClientCardProps {
  data: IClient;
  isActive?: boolean;
  onClick: () => void;
}

const ClientCard: React.FC<IClientCardProps> = ({
  isActive,
  data,
  onClick,
}) => {
  const { name, status } = data;
  return (
    <div
      onClick={onClick}
      className={`mb-2 flex h-20 cursor-pointer items-center justify-between gap-4 rounded-md px-4 ${isActive ? 'bg-primary-dark' : 'bg-card'}`}
    >
      <div className='flex items-center gap-2 overflow-hidden'>
        <div className='h-12 w-12 flex-shrink-0 rounded-full'>
          <UserIcon />
        </div>
        <div className='flex max-w-full flex-col gap-2 overflow-hidden'>
          <p
            className={`truncate font-semibold ${isActive ? 'text-primary-light' : 'text-primary-dark'}`}
          >
            {name}
          </p>
          {status && (
            <div className='flex items-start'>
              <CustomBadge text='Active' color='bg-success' />
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex-shrink-0 ${isActive ? 'text-primary-light' : 'text-primary-dark'}`}
      >
        <ThreeDotIcon />
      </div>
    </div>
  );
};

export default ClientCard;
