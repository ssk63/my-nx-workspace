import React from "react";

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

/**
 * Custom checkbox component with SVG styling
 * Used for selecting multiple options
 */
export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  description,
  disabled = false
}) => {
  return (
    <div className={`flex items-start ${disabled ? 'opacity-50' : ''}`}>
      <div className="relative flex items-center h-5 mt-1 min-w-[20px] mr-3">
        <input
          id={id}
          type="checkbox"
          onChange={onChange}
          className={`opacity-0 absolute h-5 w-5 z-10 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          checked={checked}
          disabled={disabled}
          style={{ margin: 0 }}
        />
        <div className="absolute top-0 left-0 flex items-center justify-center pointer-events-none">
          {checked ? (
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" rx="4" fill="#FB7147"/>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                className="absolute top-0 left-0"
              >
                <path d="M8.91554 11.2153L6.47707 8.77689L5.38477 9.8615L8.91554 13.3923L15.0694 7.23842L13.9848 6.15381L8.91554 11.2153Z" fill="white"/>
              </svg>
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="18" height="18" rx="3" stroke="#D1D5DB" strokeWidth="2"/>
            </svg>
          )}
        </div>
      </div>

      {/* Label and description */}
      {(label || description) && (
        <div className={`text-sm flex-1 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {label && <label htmlFor={id} className="font-medium text-gray-700 block">{label}</label>}
          {description && <span className="text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  );
}; 