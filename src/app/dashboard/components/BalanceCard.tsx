import { UpArrowIcon } from '@/assets/icons/bussiness-panel-icons';
import Link from 'next/link';
import React from 'react';

interface IBalanceCardProps {
  title: string;
  amount: string;
  rate: string;
}

const BalanceCard: React.FC<IBalanceCardProps> = ({ title, amount, rate }) => {
  return (
    <div className='mt-2 w-52 rounded-5 bg-primary-light p-4'>
      <p className='text-muted text-15'>{title}</p>
      <p className='text-28 my-2 font-semibold text-primary-dark'>{amount}</p>
      <p className='bg-success-light my-2 flex w-fit items-center rounded-3 px-2.5'>
        <span className='mr-1'>
          <UpArrowIcon />
        </span>
        <span className='text-15'>{rate}</span>
      </p>
      <p>
        <Link href='#' className='text-12 capitalize text-success underline'>
          view statement
        </Link>
      </p>
    </div>
  );
};

export default BalanceCard;
