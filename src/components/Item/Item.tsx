import React, { useState } from 'react';
import s from './Item.module.css';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type ItemProps = {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onDelete?: () => void;
  onRename?: () => void;
};

export const Item: React.FC<ItemProps> = ({ href, children, isActive, onDelete, onRename }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <Link
      to={href}
      className={cn(s.item, {
        [s.active]: isActive,
      })}
    >
      <div className={s.text}>{children}</div>
      {onDelete ? (
        <button className={s.button} onClick={handleClick}>
          <div className={s.buttonText}>∙∙∙</div>
          {isOpen ? (
            <div className={s.dropdown}>
              <button className={s.actionButton} onClick={onDelete}>
                Удалить
              </button>
              <button className={s.actionButton} onClick={onRename}>
                Переименовать
              </button>
            </div>
          ) : null}
        </button>
      ) : null}
    </Link>
  );
};
