import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';
import { Typography } from '../Typography';
import { Icon } from '../Icon';

export type OptionType = {
  value: string;
  label: string;
};

type SelectProps = {
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите опцию',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Обработчик клика вне компонента для закрытия выпадающего списка
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: OptionType) => {
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div
      ref={selectRef}
      className={`${styles.select} ${disabled ? styles.disabled : ''} ${className}`}
    >
      <div
        className={styles.selectHeader}
        onClick={toggleDropdown}
      >
        <div className={styles.selectedValue}>
          <Typography variant="base">
            {options.find(option => option.value === value)?.label}
          </Typography>
        </div>
        <div className={isOpen ? `${styles.arrow} ${styles.rotated}` : styles.arrow}>
          <Icon name='chevron-down' size={16} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.optionsContainer}>
          <ul className={styles.optionsList}>
            {options.map(option => (
              <li
                key={option.value}
                className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                <Typography variant="base">{option.label}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
