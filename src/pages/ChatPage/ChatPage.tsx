import { useEffect, useCallback, useState, useRef } from 'react';
import { sendMessages } from '../../api/sendMessages';
import { Messages } from '../../components/Messages';
import { MessageSendingPanel } from '../../components/MessageSendingPanel';

import s from './ChatPage.module.css';
import { Message } from '../../types';
import { useLocation, useParams } from 'react-router-dom';
import useChatsStore from '../../stores/chatsStore';
import useModelsStore from '../../stores/modelsStore';

export const ChatPage = () => {
  const hasRequest = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const { chats, setChatMessages } = useChatsStore();
  const { selectedModelId } = useModelsStore();
  const { id: chatId } = useParams();
  const location = useLocation();
  const { value } = location.state || {};

  const onSend = useCallback(
    async (value: string) => {
      if (!selectedModelId) {
        return null;
      }
      setIsFetching(true);

      const currentChat = chats.find(chat => chat.id === +chatId);
      const messages = currentChat?.messages || [];
      const updatedMessages: Message[] = [...messages, { role: 'user', content: value }];
      setChatMessages(updatedMessages, +chatId);
      const response = await sendMessages({
        messages: updatedMessages,
        model: selectedModelId,
      });

      const systemMessage: Message = {
        role: 'system',
        error: response.error?.message,
        content: response.choices?.[0]?.message?.content,
      };
      const finalMessages: Message[] = [...updatedMessages, systemMessage];
      setIsFetching(false);
      setChatMessages(finalMessages, +chatId);
    },
    [chats, chatId]
  );

  useEffect(() => {
    if (value && !hasRequest.current) {
      hasRequest.current = true;
      onSend(value);
    }
  }, [value]);

  const currentChat = chats.find(chat => chat.id === +chatId);

  return (
    <div className={s.container}>
      <div className={s.messages}>
        <Messages messages={currentChat?.messages || []} isLoading={isFetching} />
      </div>
      <div className={s.inputPanel}>
        <MessageSendingPanel onSend={onSend} />
      </div>
    </div>
  );
};
