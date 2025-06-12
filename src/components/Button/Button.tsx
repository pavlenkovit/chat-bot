import React from 'react';
import s from './Button.module.css';
import cn from 'classnames';
import { Typography } from '../Typography';

export type ButtonVariant = 'primary' | 'black';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'black',
  disabled = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={cn(s.button, s[variant], { [s.disabled]: disabled }, className)}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <span className={s.icon}>{leftIcon}</span>}
      <span className={s.text}><Typography>{children}</Typography></span>
      {rightIcon && <span className={s.icon}>{rightIcon}</span>}
    </button>
  );
}; 