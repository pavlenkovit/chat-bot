import s from './Chats.module.css';
import { Item } from '../Item';
import { useParams } from 'react-router-dom';
import useChatsStore from '../../stores/chatsStore';

export const Chats = () => {
  const { chats } = useChatsStore();
  const { id } = useParams();

  return (
    <div className={s.container}>
      <div className={s.newChat}>
        <Item href={'/'} isActive={!id}>
          Новый чат
        </Item>
      </div>
      {chats.map(chat => (
        <div key={chat.id} className={s.item}>
          <Item href={`/chat/${chat.id}`} isActive={`${chat.id}` === id}>
            {chat.name}
          </Item>
        </div>
      ))}
    </div>
  );
};
