import React from 'react';
import { orbitron } from '@/assets/fonts/google-font';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className='relative grid h-screen w-screen place-content-center place-items-center'>
      <div className='absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 text-center sm:w-[360px] md:w-[480px] xl:w-[590px]'>
        <div className='relative z-10 mb-5 h-[110px] sm:h-[150px] md:h-[200px]'>
          <h1
            className={
              orbitron.className +
              ' absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 text-[92px] font-normal uppercase text-[#211b19] sm:text-[136px] md:text-[186px] xl:text-[236px]'
            }
          >
            Oops!
          </h1>
          <h2
            className={
              orbitron.className +
              ' absolute bottom-0 left-0 right-0 m-auto inline-block w-[242px] bg-white px-[5px] py-[10px] text-center text-[12px] font-normal uppercase text-[#211b19] sm:w-[360px] sm:text-[18px] md:w-[472px] md:text-[24px] xl:w-[590px] xl:text-[28px]'
            }
          >
            404 - The Page can&apos;t be found
          </h2>
        </div>
        <Link
          href='/'
          className='relative top-6 z-50 m-auto bg-[#ff6300] px-6 py-3 text-white'
        >
          Go TO Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
