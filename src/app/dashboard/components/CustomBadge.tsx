import React from 'react';

//eslint-disable-next-line
const CustomBadge = ({ text, color }: any) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className='flex items-center justify-center rounded-full px-3 text-[10px] text-white'
    >
      {text}
    </div>
  );
};

export default CustomBadge;
