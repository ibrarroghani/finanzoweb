import React from 'react';

interface IButtonProps {
  title: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const CustomButton = ({
  title,
  icon,
  type = 'button',
  onClick,
}: IButtonProps) => {
  return (
    <button
      className='bg-primaryDarkAccent flex w-full items-center justify-center gap-2 rounded-md p-3 capitalize text-white'
      type={type}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span className='text-sm'>{title}</span>
    </button>
  );
};

export default CustomButton;
