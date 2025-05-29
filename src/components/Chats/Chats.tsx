import s from './Chats.module.css';
import { Item } from '../Item';

export const Chats = () => {
  return (
    <div className={s.container}>
      {new Array(200).fill(0).map((item, index) => (
        <Item href="#" key={index}>
          {index} chat
        </Item>
      ))}
    </div>
  );
};
