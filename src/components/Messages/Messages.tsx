import { FC, useEffect, useRef } from 'react';
import s from './Messages.module.css';
import Markdown from 'markdown-to-jsx';
import { Message } from '../../types.ts';
import cn from 'classnames';
import { Typography } from '../Typography';

type MessagesProps = {
  messages: Message[];
  isLoading: boolean;
};
export const Messages: FC<MessagesProps> = ({ messages, isLoading }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={containerRef} className={s.scrollContainer}>
      <div className={s.container}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(s.message, {
              [s.myMessage]: message.role === 'user',
              [s.theirMessage]: message.role === 'system',
              [s.error]: !!message.error,
            })}
          >
            <Typography variant="h1">
              {message.error}
              <Markdown>{message.content}</Markdown>
            </Typography>
          </div>
        ))}
        {isLoading ? <div className={cn(s.message, s.theirMessage)}><Typography variant="h1">Подождите...</Typography></div> : null}
      </div>
    </div>
  );
};
