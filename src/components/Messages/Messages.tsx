import { FC, useEffect, useRef } from 'react';
import s from './Messages.module.css';
import Markdown from 'markdown-to-jsx';
import { Message } from '../../types.ts';
import cn from 'classnames';
import { Typography } from '../Typography';
import { Message as MessageComponent } from '../Message';

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
          <MessageComponent
            key={index}
            isMine={message.role === 'user'}
            isError={!!message.error}
          >
            {message.error}
            <Markdown>{message.content}</Markdown>
          </MessageComponent>
        ))}
        {isLoading ? (
          <MessageComponent>
            Подождите...
          </MessageComponent>
        ) : null}
      </div>
    </div>
  );
};
