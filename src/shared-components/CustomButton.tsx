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
      className='bg-primary-dark text-primary-light flex w-full items-center justify-center gap-2 rounded-md p-3 capitalize'
      type={type}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span className='text-15'>{title}</span>
    </button>
  );
};

export default CustomButton;
