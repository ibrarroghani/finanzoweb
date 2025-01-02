import React from 'react';
import CustomBadge from './CustomBadge';
import Image from 'next/image';
import Spinner from '@/shared-components/Spinner';

interface IClientDetails {
  name: string;
  email: string;
  image: string;
  slug: string;
  address: string;
  phone: string;
  status: number;
}

interface IClientDetailsProps {
  isLoading: boolean;
  data: IClientDetails;
}

const ClientDetailsCard: React.FC<IClientDetailsProps> = ({
  data,
  isLoading,
}) => {
  const fallbackImageUrl = '/images/user-image.png';
  const { name, email, image, address, phone, status } = data;

  return (
    <div className='card flex flex-col items-center lg:flex-row'>
      {isLoading ? (
        <div className='flex min-h-16 flex-1 items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='flex flex-col lg:w-1/2 lg:flex-row lg:items-center lg:justify-between lg:border-r lg:border-r-border-primary'>
            <div className='flex items-center gap-4'>
              <div className='h-16 w-16 overflow-hidden'>
                <Image
                  src={image || fallbackImageUrl}
                  alt='profile'
                  width={64}
                  height={64}
                  className='0bject-cover rounded-full'
                />
              </div>
              <div className='flex flex-col items-start gap-1.5'>
                <p className='text-extra-large font-medium capitalize'>
                  {name}
                </p>
                <div className='flex items-start'>
                  <CustomBadge
                    text={status ? 'Active' : 'Inactive'}
                    color={status ? 'bg-success' : 'bg-muted'}
                  />
                </div>
              </div>
            </div>
            <div className='text-medium mt-2 flex flex-col font-medium lg:mt-0 lg:pr-8'>
              <p>Phone: {phone}</p>
              <p>Email: {email}</p>
            </div>
          </div>
          <div className='text-medium flex gap-1 lg:w-1/2 lg:flex-col lg:pl-8'>
            <p className='font-medium capitalize'>address:</p>
            <p>{address}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientDetailsCard;
