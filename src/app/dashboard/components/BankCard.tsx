import Link from 'next/link';
import React from 'react';

interface IBankCardProps {
  title: string;
  account: string;
  card: string;
}

const BankCard: React.FC<IBankCardProps> = ({ title, account, card }) => {
  return (
    <div className='card card-border w-full'>
      <p className='card-title'>{title}</p>
      <p className='card-subtitle'>account: {account}</p>
      <p className='card-subtitle'>card: {card}</p>
      <p>
        <Link href='#' className='card-link text-link-secondary'>
          view statement
        </Link>
      </p>
    </div>
  );
};

export default BankCard;
