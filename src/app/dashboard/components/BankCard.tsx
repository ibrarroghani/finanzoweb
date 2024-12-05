import Link from 'next/link';
import React from 'react';

interface IBankCardProps {
  title: string;
  account: string;
  card: string;
}

const BankCard: React.FC<IBankCardProps> = ({ title, account, card }) => {
  return (
    <div className='mt-2 w-72 rounded-5 border border-border-primary bg-primary-light p-4'>
      <p className='text-18 font-semibold text-primary-dark'>{title}</p>
      <p className='text-muted text-12'>Account: {account}</p>
      <p className='text-muted text-12'>Card: {card}</p>
      <p>
        <Link href='#' className='text-12 capitalize text-success underline'>
          view statement
        </Link>
      </p>
    </div>
  );
};

export default BankCard;
