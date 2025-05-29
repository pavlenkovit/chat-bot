import React from 'react';
import styles from './Item.module.css';

// Определение типов пропсов
interface ItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  isDark?: boolean;
}

export const Item: React.FC<ItemProps> = ({
  href,
  children,
  className = '',
  target,
  rel,
  onClick,
  isDark = false,
}) => {
  // Формируем итоговый класс компонента
  const itemClassName = `${styles.item} ${isDark ? styles.itemDark : ''} ${className}`.trim();

  // Если target="_blank", автоматически добавляем rel="noopener noreferrer" для безопасности
  const itemRel = target === '_blank' ? `noopener noreferrer ${rel || ''}`.trim() : rel;

  return (
    <a href={href} className={itemClassName} target={target} rel={itemRel} onClick={onClick}>
      {children}
    </a>
  );
};
