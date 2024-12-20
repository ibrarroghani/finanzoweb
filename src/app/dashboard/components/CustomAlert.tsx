import { Alert } from 'antd';
import React from 'react';

const CustomAlert = () => {
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //eslint-disable-next-line no-console
    console.log(e, 'I was closed.');
  };
  return (
    <div className='mb-6'>
      <Alert
        className='text-small font-semibold text-danger'
        message='Warning Text Warning Text Warning Text Warning Text Warning Text Warning TextWarning Text'
        type='error'
        closable
        onClose={onClose}
      />
    </div>
  );
};

export default CustomAlert;
