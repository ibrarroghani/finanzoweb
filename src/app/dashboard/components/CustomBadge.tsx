import React from 'react';

interface ICustomBadgeProps {
  text: string;
  color: string;
}

const CustomBadge: React.FC<ICustomBadgeProps> = ({ text, color }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full px-3 text-[10px] uppercase text-primary-light ${color}`}
    >
      {text}
    </div>
  );
};

export default CustomBadge;
