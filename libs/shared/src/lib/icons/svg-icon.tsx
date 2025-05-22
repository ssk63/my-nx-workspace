import React from 'react';
import icons from './icons.json';

export type IconName = keyof typeof icons;
export type IconSize = 'sm' | 'md' | 'lg';

interface SvgIconProps {
  name: IconName;
  color?: string;
  size?: IconSize;
  className?: string;
}

/**
 * A reusable SVG icon component that renders icons from icons.json
 */
export const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  color,
  size = 'md',
  className = ''
}) => {
  // Get SVG string from icons.json
  const svgString = icons[name] || icons.fallback;

  // Size classes mapping
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  // Apply styling
  const finalClassName = `inline-block ${sizeClasses[size]} ${className}`;
  const style = color ? { color } : {};

  // Create HTML from SVG string
  const createMarkup = () => {
    return { __html: svgString };
  };

  return (
    <span 
      className={finalClassName}
      style={style}
      dangerouslySetInnerHTML={createMarkup()}
      role="img"
      aria-hidden="true"
    />
  );
}; 