import { useState } from 'react';
import styles from './MessageSendingPanel.module.css';
import { Button } from '../Button';

type MessageSendingPanelProps = {
  onSend: (message: string) => void;
};

export const MessageSendingPanel = ({ onSend }: MessageSendingPanelProps) => {
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
      <Button disabled={!message} variant={'primary'} onClick={handleSend}>Отправить</Button>
    </div>
  );
};
