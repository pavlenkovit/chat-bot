import React from 'react';
import cn from 'classnames';
import s from './Message.module.css';
import { Typography } from '../Typography';

interface MessageProps {
  children: React.ReactNode;
  className?: string;
  isMine?: boolean;
  isError?: boolean;
}

export const Message: React.FC<MessageProps> = ({ children, className, isMine, isError }) => {
  return (
    <div
      className={cn(s.message, className, {
        [s.mine]: isMine,
        [s.error]: isError,
      })}
    >
      <Typography variant="base">{children}</Typography>
    </div>
  );
}; 