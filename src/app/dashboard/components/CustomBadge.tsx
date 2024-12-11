import React from 'react';

interface ICustomBadgeProps {
  text: string;
  color: string;
}

const CustomBadge: React.FC<ICustomBadgeProps> = ({ text, color }) => {
  return (
    <div
      className={`text-extra-small flex items-center justify-center rounded-full px-3 uppercase text-primary-light ${color}`}
    >
      {text}
    </div>
  );
};

export default CustomBadge;
