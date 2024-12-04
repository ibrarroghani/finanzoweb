'use client';
import React from 'react';
import ClientCard from '@/app/dashboard/components/ClientCard';
import CustomButton from '../CustomButton';

const Sidebar = () => {
  const clients = [
    { id: 1, name: 'mithun', status: true },
    { id: 2, name: 'mithun', status: true },
    { id: 3, name: 'mithun', status: true },
    { id: 4, name: 'mithun', status: true },
    { id: 5, name: 'mithun', status: true },
    { id: 6, name: 'mithun', status: true },
    { id: 7, name: 'mithun', status: true },
    { id: 8, name: 'mithun', status: true },
    { id: 9, name: 'mithun', status: true },
  ];

  const handleCard = () => {
    //eslint-disable-next-line
    console.log('Card is clicked');
  };

  return (
    <div className='w-64 border-r'>
      <div className='border-b-border-primary h-[calc(100%-100px)] overflow-y-auto border-b p-4'>
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            name={client.name}
            status={client.status}
            onClick={handleCard}
          />
        ))}
      </div>

      <div className='mt-8 pl-4 pr-8'>
        <CustomButton title='Add Client' />
      </div>
    </div>
  );
};

export default Sidebar;
