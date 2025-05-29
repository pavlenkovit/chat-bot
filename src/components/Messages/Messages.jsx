import React from 'react';
import styles from './Messages.module.css';
import Markdown from "markdown-to-jsx";

export const Messages = ({ messages }) => {
  return (
    <div className={styles.container}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            message.isMine ? styles.myMessage : styles.theirMessage
          }`}
        >
          <Markdown>{message.text}</Markdown>
        </div>
      ))}
    </div>
  );
};
