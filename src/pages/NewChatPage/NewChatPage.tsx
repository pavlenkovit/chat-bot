import { useCallback } from 'react';
import { MessageSendingPanel } from '../../components/MessageSendingPanel';

import s from './NewChatPage.module.css';
import { useNavigate } from 'react-router-dom';
import useChatsStore from '../../stores/chatsStore.ts';

export const NewChatPage = () => {
  const { chats } = useChatsStore();
  const lastChatId = chats[chats.length - 1]?.id || 0;
  const chatId = lastChatId + 1;
  const navigate = useNavigate();

  const handleSend = useCallback(async (value: string) => {
    navigate(`/chat/${chatId}`, { state: { value } });
  }, []);

  return (
    <div className={s.container}>
      <div>О чем вы хотите узнать?</div>
      <MessageSendingPanel onSend={handleSend} />
    </div>
  );
};
