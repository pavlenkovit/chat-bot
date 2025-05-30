import { create } from 'zustand';
import { Chat, Message } from '../types';
import { MOCK_CHATS } from '../consts';

type ChatsState = {
  chats: Chat[];
  setChatMessages: (messages: Message[], chatId: number) => void;
  deleteChat: (chatId: number) => void;
  renameChat: (chatId: number, name: string) => void;
};

const useChatsStore = create<ChatsState>(set => {
  const storedChats = localStorage.getItem('chats');
  const initialChats = storedChats ? (JSON.parse(storedChats) as Chat[]) : MOCK_CHATS;

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
    deleteChat: chatId => {
      set(state => {
        const newChats = state.chats.filter(chat => chat.id !== chatId);
        localStorage.setItem('chats', JSON.stringify(newChats));
        return { chats: newChats };
      });
    },
    renameChat: (chatId, name) => {
      set(state => {
        const newChats = state.chats.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              name,
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
