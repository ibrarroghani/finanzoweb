import React from 'react';

interface IButtonProps {
  title: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

const CustomButton = ({
  title,
  icon,
  type = 'button',
  className = 'bg-primary-dark text-primary-light',
  onClick,
}: IButtonProps) => {
  return (
    <button
      className={`flex w-full items-center justify-center gap-2 rounded-md p-3 capitalize ${className}`}
      type={type}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span className='text-medium'>{title}</span>
    </button>
  );
};

export default CustomButton;
