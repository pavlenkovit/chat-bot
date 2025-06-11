import React from 'react';
import s from './Typography.module.css';
import cn from 'classnames';

export type TypographyVariant = 'h1' | 'h2' | 'base';

interface TypographyProps {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'base',
  className,
  children,
}) => {
  return (
    <span className={cn(s[variant], className)}>{children}</span>
  );
}; 