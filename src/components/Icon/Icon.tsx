import React from 'react';
import PlusIcon from '../../icons/plus.svg?react';
import AiMagicIcon from '../../icons/ai-magic.svg?react';
import ChevronDownIcon from '../../icons/chevron-down.svg?react';

const icons = {
  plus: PlusIcon,
  'ai-magic': AiMagicIcon,
  'chevron-down': ChevronDownIcon,
};

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: 16 | 24;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'currentColor', className }) => {
  const SvgIcon = icons[name];
  return <SvgIcon width={size} height={size} fill={color} className={className} />;
};