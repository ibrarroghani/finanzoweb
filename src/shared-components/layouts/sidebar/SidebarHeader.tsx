import { SearchIcon } from '@/assets/icons/bussiness-panel-icons';
import InputField from '@/shared-components/InputField';
import React from 'react';
import { Control, FieldValues } from 'react-hook-form';

interface ISidebarHeaderProps {
  control: Control<FieldValues>;
  //eslint-disable-next-line
  onSearch: (data: { search: string }) => void;
  totalClients: number;
}

const SidebarHeader = ({
  control,
  onSearch,
  totalClients,
}: ISidebarHeaderProps) => {
  return (
    <div className='-mx-2 mb-3 border-b border-b-border-primary'>
      <div className='flex flex-col px-6 py-2'>
        <div className='flex items-center justify-between'>
          <p className='text-medium font-semibold'>Client List</p>
          <p className='text-extra-small'>Total Client: {totalClients}</p>
        </div>

        <InputField
          id='search'
          name='search'
          control={control as unknown as Control<FieldValues>}
          icon={<SearchIcon />}
          onCustomChange={(value) => onSearch({ search: value })}
        />
      </div>
    </div>
  );
};

export default SidebarHeader;
