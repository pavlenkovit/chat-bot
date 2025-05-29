import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';

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
        className={`${styles.selectHeader} ${isOpen ? styles.active : ''}`}
        onClick={toggleDropdown}
      >
        <div className={styles.selectedValue}>
          {options.find(option => option.value === value)?.label || placeholder}
        </div>
        <div className={styles.arrow}>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isOpen ? styles.rotated : ''}
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
