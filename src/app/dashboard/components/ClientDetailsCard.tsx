import React from 'react';
import CustomBadge from './CustomBadge';
import Image from 'next/image';

const ClientDetailsCard: React.FC = () => {
  return (
    <div className='flex flex-col items-center rounded-5 bg-primary-light p-4 lg:flex-row'>
      <div className='flex flex-col lg:w-1/2 lg:flex-row lg:items-center lg:justify-between lg:border-r lg:border-r-border-primary'>
        <div className='flex gap-4'>
          <div className='h-16 w-16 overflow-hidden rounded-full'>
            <Image
              src='/images/user-image.png'
              alt='user image'
              width={64}
              height={64}
              className='object-cover'
            />
          </div>
          <div className='flex flex-col items-start gap-1.5'>
            <p className='text-25 font-medium capitalize'>client name</p>
            <CustomBadge text='Active' color='bg-success' />
          </div>
        </div>
        <div className='mt-2 flex flex-col text-15 font-medium lg:mt-0 lg:pr-8'>
          <p>Phone: +3840595859959</p>
          <p>Email: client@gmail.com</p>
        </div>
      </div>
      <div className='flex gap-1 text-15 lg:w-1/2 lg:flex-col lg:pl-8'>
        <p className='font-medium capitalize'>address:</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing</p>
      </div>
    </div>
  );
};

export default ClientDetailsCard;
