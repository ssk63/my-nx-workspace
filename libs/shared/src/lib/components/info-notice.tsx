import React from 'react';
import type { ReactNode } from 'react';
import { SvgIcon } from '../icons';

interface InfoNoticeProps {
  children: ReactNode;
  theme?: 'orange' | 'blue' | 'green' | 'gray';
  className?: string;
}

export const InfoNotice: React.FC<InfoNoticeProps> = ({ 
  children, 
  theme = 'orange',
  className = ''
}) => {
  // Define theme colors
  const themeStyles = {
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      iconColor: 'text-orange-500'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      iconColor: 'text-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      iconColor: 'text-green-500'
    },
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      iconColor: 'text-gray-500'
    }
  };

  const { bg, border, iconColor } = themeStyles[theme];

  return (
    <div className={`${bg} ${border} rounded-md p-4 flex items-start gap-3 ${className}`}>
      <div className={`${iconColor} flex-shrink-0`}>
        <SvgIcon name="info" size="md" />
      </div>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}; 