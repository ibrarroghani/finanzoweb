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
    <div className='card w-full'>
      <p className='card-secondary-subtitle text-muted'>{title}</p>
      <p className='card-title text-huge text-primary-dark'>{amount}</p>
      <p className='my-2 flex w-fit items-center rounded-3 bg-success-light px-2.5'>
        <span className='mr-1'>
          <UpArrowIcon />
        </span>
        <span className='text-15'>{rate}</span>
      </p>
      <p>
        <Link href='#' className='card-link text-success'>
          view statement
        </Link>
      </p>
    </div>
  );
};

export default BalanceCard;
