import React from 'react';
import CustomBadge from './CustomBadge';
import Image from 'next/image';

interface IClientCardProps {
  name: string;
  address: string;
  image: string;
}

const ClientDetailsCard: React.FC<IClientCardProps> = ({
  name,
  address,
  image,
}) => {
  return (
    <div className='flex items-center rounded-5 bg-primary-light p-4'>
      <div className='w-1/2 border-r border-r-border-primary'>
        <div className='flex items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-content'>
            <Image src={image} alt='user image' width={100} height={100} />
          </div>
          <div className='flex flex-col items-start gap-1.5'>
            <p className='text-25 font-medium capitalize'>{name}</p>
            <CustomBadge text='Active' color='#3FA75A' />
          </div>
        </div>
      </div>
      <div className='w-1/2 pl-6 text-15'>
        <p className='capitalize'>address:</p>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default ClientDetailsCard;
