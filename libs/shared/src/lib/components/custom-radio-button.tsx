import React from "react";

interface CustomRadioButtonProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  description?: string;
}

/**
 * Custom radio button component with SVG styling
 * Used for selecting a single option from a list of options
 */
export const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  id,
  checked,
  onChange,
  label,
  description
}) => {
  return (
    <div className="flex items-start">
      <div className="relative flex items-center h-5 mt-1">
        <input
          id={id}
          type="radio"
          onChange={onChange}
          className="opacity-0 absolute h-5 w-5 cursor-pointer"
          checked={checked}
        />
        <div className="flex items-center justify-center">
          {checked ? (
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <circle cx="10" cy="10.5" r="10" fill="#FB7147"/>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="21" 
                viewBox="0 0 20 21" 
                fill="none"
                className="absolute top-0 left-0"
              >
                <path d="M8.91554 11.7153L6.47707 9.27689L5.38477 10.3615L8.91554 13.8923L15.0694 7.73842L13.9848 6.65381L8.91554 11.7153Z" fill="white"/>
              </svg>
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9" stroke="#D1D5DB" strokeWidth="2"/>
            </svg>
          )}
        </div>
      </div>

      {/* Label and description */}
      {(label || description) && (
        <div className="ml-3 text-sm">
          {label && <label htmlFor={id} className="font-medium text-gray-700 block">{label}</label>}
          {description && <span className="text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  );
}; 