import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant} ${size}`}
    >
      {children}
    </button>
  );
}; 