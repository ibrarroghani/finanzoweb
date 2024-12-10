import React from 'react';

interface ICustomBadgeProps {
  text: string;
  color: string;
}

const CustomBadge: React.FC<ICustomBadgeProps> = ({ text, color }) => {
  return <div className={`badge ${color}`}>{text}</div>;
};

export default CustomBadge;
