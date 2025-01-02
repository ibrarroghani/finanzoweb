import React from 'react';
import CustomBadge from './CustomBadge';
import { ThreeDotIcon } from '@/assets/icons/bussiness-panel-icons';
import { IClient } from '@/shared-components/layouts/sidebar/Sidebar';
//import { Tooltip } from 'antd';
import Image from 'next/image';

// interface IClient {
//   id: number;
//   name: string;
//   status: boolean;
// }
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
  const fallbackImageUrl = '/images/user-image.png';
  const { name, is_active, profile_picture_url } = data;
  return (
    <div
      onClick={onClick}
      className={`mb-2 flex h-20 cursor-pointer items-center justify-between gap-4 rounded-md px-4 ${isActive ? 'bg-primary-dark' : 'bg-card'}`}
    >
      <div className='flex items-center gap-2 overflow-hidden'>
        <div className='h-12 w-12 flex-shrink-0'>
          {/* <UserIcon /> */}
          <Image
            src={profile_picture_url || fallbackImageUrl}
            alt='profile'
            width={48}
            height={48}
            className='0bject-cover rounded-full'
          />
        </div>
        <div className='flex max-w-full flex-col gap-2 overflow-hidden'>
          <p
            title={name}
            className={`truncate font-semibold ${isActive ? 'text-primary-light' : 'text-primary-dark'}`}
          >
            {name}
          </p>

          {/* {is_active && (
            <div className='flex items-start'>
              <CustomBadge text='Active' color='bg-success' />
            </div>
          )} */}
          <div className='flex items-start'>
            <CustomBadge
              text={is_active ? 'Active' : 'Inactive'}
              color={is_active ? 'bg-success' : 'bg-muted'}
            />
          </div>
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
