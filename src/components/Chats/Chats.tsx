import s from './Chats.module.css';
import { Item } from '../Item';
import { useNavigate, useParams } from 'react-router-dom';
import useChatsStore from '../../stores/chatsStore';
import { Button } from '../Button';
import { Icon } from '../Icon';

export const Chats = () => {
  const { chats, deleteChat, renameChat } = useChatsStore();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <Button leftIcon={<Icon name='plus' size={16} />} className={s.newChatButton} variant='primary' onClick={() => navigate('/')}>Новый чат</Button>
      {chats.map(chat => (
        <div key={chat.id} className={s.item}>
          <Item
            href={`/chat/${chat.id}`}
            isActive={`${chat.id}` === id}
            onDelete={() => {
              deleteChat(chat.id);
              navigate('/');
            }}
            onRename={() => {
              const userInput = prompt('Введите новое название');
              if (userInput) {
                renameChat(chat.id, userInput);
              }
            }}
          >
            {chat.name}
          </Item>
        </div>
      ))}
    </div>
  );
};
