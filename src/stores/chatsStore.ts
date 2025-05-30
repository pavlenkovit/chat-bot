import { create } from 'zustand';
import { Chat, Message } from '../types.ts';

type ChatsState = {
  chats: Chat[];
  setChatMessages: (messages: Message[], chatId: number) => void;
};

const useChatsStore = create<ChatsState>(set => {
  const storedChats = localStorage.getItem('chats');
  const initialChats = storedChats ? (JSON.parse(storedChats) as Chat[]) : [];

  return {
    chats: initialChats,
    setChatMessages: (messages, chatId) => {
      set(state => {
        if (!state.chats.find(chat => chat.id === chatId)) {
          return { chats: [...state.chats, { id: chatId, name: messages[0]?.content, messages }] };
        }

        const newChats = state.chats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages,
            };
          }
          return chat;
        });
        localStorage.setItem('chats', JSON.stringify(newChats));
        return { chats: newChats };
      });
    },
  };
});

export default useChatsStore;
