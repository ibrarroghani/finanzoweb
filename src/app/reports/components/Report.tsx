import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import {
  DownloadIconTwo,
  FilterIcon,
} from '@/assets/icons/bussiness-panel-icons';
import BarChart from '@/shared-components/chart/BarChart';
import CustomButton from '@/shared-components/CustomButton';
import React from 'react';

const Report = () => {
  const data: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  return (
    <div className='p-4'>
      <ClientDetailsCard />
      <div className='rounded-extra-small mt-2 bg-primary-light p-4'>
        <div className='flex justify-between p-4'>
          <p className='text-large font-semibold'>Reports</p>
          <div className='flex gap-2'>
            <CustomButton
              title='filter'
              icon={<FilterIcon />}
              className='border border-border-primary bg-primary-light text-primary-dark'
            />
            <CustomButton title='export' icon={<DownloadIconTwo />} />
          </div>
        </div>

        <div className='rounded-medium flex flex-col bg-card px-8 py-4'>
          <p className='p-4 capitalize'>income label</p>
          <div className='flex-1 bg-primary-light p-4'>
            <BarChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
