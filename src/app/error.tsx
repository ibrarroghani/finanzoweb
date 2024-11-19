'use client';

import React from 'react';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className='rounded-md bg-red-100 p-4 text-red-600'>
      <h1 className='text-lg font-bold'>Something went wrong!</h1>
      <p>{error.message}</p>
      <button
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-white'
        onClick={reset} // Retry rendering
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
