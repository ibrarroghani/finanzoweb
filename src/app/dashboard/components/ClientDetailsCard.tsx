import React from 'react';
import CustomBadge from './CustomBadge';
import Image from 'next/image';

const ClientDetailsCard: React.FC = () => {
  return (
    <div className='client-card-container'>
      <div className='client-info'>
        <div className='flex gap-4'>
          <div className='client-avatar'>
            <Image
              src='/images/user-image.png'
              alt='user image'
              width={64}
              height={64}
              className='object-cover'
            />
          </div>
          <div className='client-details'>
            <p className='client-name'>client name</p>
            <CustomBadge text='Active' color='bg-success' />
          </div>
        </div>
        <div className='client-contact'>
          <p>Phone: +3840595859959</p>
          <p>Email: client@gmail.com</p>
        </div>
      </div>
      <div className='address-info'>
        <p className='address-title'>address:</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing</p>
      </div>
    </div>
  );
};

export default ClientDetailsCard;
