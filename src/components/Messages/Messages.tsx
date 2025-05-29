import { FC } from 'react';
import styles from './Messages.module.css';
import Markdown from 'markdown-to-jsx';
import { Message } from '../../types.ts';

type MessagesProps = {
  messages: Message[];
};
export const Messages: FC<MessagesProps> = ({ messages }) => {
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.container}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.role === 'user' ? styles.myMessage : styles.theirMessage
            }`}
          >
            <Markdown>{message.content}</Markdown>
          </div>
        ))}
      </div>
    </div>
  );
};
