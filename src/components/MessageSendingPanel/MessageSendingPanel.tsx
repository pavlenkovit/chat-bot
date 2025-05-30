import { useState } from 'react';
import styles from './MessageSendingPanel.module.css';

export const MessageSendingPanel = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={message}
        placeholder="Введите сообщение"
        onChange={e => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className={styles.button} onClick={handleSend}>
        Отправить
      </button>
    </div>
  );
};
