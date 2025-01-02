import React from 'react';
import { ClientAddIcon } from '@/assets/icons/bussiness-panel-icons';
import CustomButton from '@/shared-components/CustomButton';

const SidebarFooter = () => {
  return (
    <div className='-mx-2 border-t border-t-border-primary'>
      <div className='my-4 pl-4 pr-8'>
        <CustomButton
          title='Add Client'
          icon={<ClientAddIcon />}
          className='btn-gradient'
        />
      </div>
    </div>
  );
};

export default SidebarFooter;
