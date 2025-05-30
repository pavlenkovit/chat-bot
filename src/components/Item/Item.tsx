import React from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type ItemProps = {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
};

export const Item: React.FC<ItemProps> = ({ href, children, isActive }) => {
  return (
    <Link
      to={href}
      className={cn(styles.item, {
        [styles.active]: isActive,
      })}
    >
      {children}
    </Link>
  );
};
