import React from 'react';
import CustomBadge from './CustomBadge';
import Image from 'next/image';

const ClientDetailsCard: React.FC = () => {
  return (
    <div className='flex items-center rounded-5 bg-primary-light p-4'>
      <div className='flex w-1/2 items-center justify-between border-r border-r-border-primary'>
        <div className='flex gap-4'>
          <div className='h-16 w-16 rounded-full'>
            <Image
              src='/images/user-image.png'
              alt='user image'
              width={100}
              height={100}
            />
          </div>
          <div className='flex flex-col items-start gap-1.5'>
            <p className='text-25 font-medium capitalize'>client name</p>
            <CustomBadge text='Active' color='bg-success' />
          </div>
        </div>
        <div className='flex flex-col pr-8 text-15 font-medium'>
          <p>Phone: +3840595859959</p>
          <p>Email: client@gmail.com</p>
        </div>
      </div>
      <div className='w-1/2 pl-8 text-15 font-medium'>
        <p className='capitalize'>address:</p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.asperiore
        </p>
      </div>
    </div>
  );
};

export default ClientDetailsCard;
