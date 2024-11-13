import Spinner from '@/shared-components/Spinner';
import React from 'react';

const loading = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Spinner />
    </div>
  );
};

export default loading;
