import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  disabled = false,
  size = 'md'
}) => {
  // Size configurations
  const sizes = {
    sm: { width: 40, height: 22, thumbSize: 18, padding: 2 },
    md: { width: 50, height: 27, thumbSize: 22, padding: 2.5 },
    lg: { width: 60, height: 32, thumbSize: 26, padding: 3 }
  };

  const { width, height, thumbSize, padding } = sizes[size];
  
  // Calculate positions
  const offPosition = padding;
  const onPosition = width - thumbSize - padding;

  return (
    <div 
      className={`relative inline-block ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={disabled ? undefined : onToggle}
      role="switch"
      aria-checked={isOn}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          onToggle();
          e.preventDefault();
        }
      }}
    >
      {/* Track */}
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect 
          x="0" 
          y="0" 
          width={width} 
          height={height} 
          rx={height / 2} 
          fill={isOn ? "#E85427" : "#D9DDE2"}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      
      {/* Thumb - Centered with flexbox */}
      <div 
        className="absolute top-0 left-0 flex items-center justify-center"
        style={{
          width: thumbSize,
          height: height,
          transition: 'transform 300ms ease-in-out',
          transform: `translateX(${isOn ? onPosition : offPosition}px)`,
        }}
      >
        <svg 
          width={thumbSize} 
          height={thumbSize}
          viewBox={`0 0 ${thumbSize} ${thumbSize}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle 
            cx={thumbSize/2} 
            cy={thumbSize/2} 
            r={(thumbSize/2) - 1} 
            fill="white"
            stroke="#E1E1E1"
            strokeWidth="0.5"
            className="filter drop-shadow-md"
          />
        </svg>
      </div>
    </div>
  );
}; 