import { DonutIcon } from '@/assets/icons/bussiness-panel-icons';
import React from 'react';
import CustomBadge from './CustomBadge';

const GoalCard = () => {
  return (
    // <div className='flex rounded-5 border border-border-primary bg-primary-light'>
    //   <div className='w-1/2 px-4'>
    //     <p className='mt-2 border-b border-border-primary text-18 font-bold text-primary-dark'>
    //       SIP Goal
    //     </p>
    //     <p className='my-2 text-12 capitalize'>last payment</p>
    //     <p className='text-[20px] font-bold text-success'>$200</p>
    //     <p className='my-2 text-12 capitalize'>upcoming payment</p>
    //     <p className='text-18 font-bold text-primary-dark'>$200</p>
    //   </div>
    //   <div className='flex w-1/2 items-center pt-8'>
    //     <DonutIcon />
    //   </div>
    // </div>

    <div className='flex flex-col rounded-5 border border-border-primary bg-primary-light px-4'>
      <div className='flex items-center justify-between border-b border-border-primary py-2'>
        <p className='text-18 font-bold text-primary-dark'>SIP Goals</p>
        <div className='flex gap-3'>
          <p>
            <CustomBadge text='Active' color='#3FA75A' />
          </p>
          {/* <p>
            <EditIcon />
          </p> */}
        </div>
      </div>
      <div className='flex py-2'>
        <div className='w-1/2'>
          <p className='my-2 text-12 capitalize'>last payment</p>
          <p className='my-2 text-18 font-bold text-success'>$200</p>
          <p className='my-2 text-12 capitalize'>upcoming payment</p>
          <p className='my-2 text-18 font-bold text-primary-dark'>$200</p>
          <p className='my-2 text-12 capitalize'>last payment</p>
          <p className='text-14 my-2 font-semibold capitalize'>23 may, 2025</p>
        </div>
        <div className='reletive flex w-1/2 flex-col items-center'>
          <DonutIcon />
          <p className='text-14'>
            <span className='font-semibold'>$450</span>
            <span>/$500</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
