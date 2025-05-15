import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onChange, 
  disabled = false,
  label
}) => {
  return (
    <label 
      className={`
        inline-flex items-center justify-center 
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
      title={label}
    >
      <div
        onClick={!disabled ? onChange : undefined}
        className={`
          w-5 h-5 rounded-md flex items-center justify-center
          transition-all duration-200 ease-in-out
          ${checked && !disabled 
            ? 'bg-green-500 border-green-600' 
            : disabled 
              ? 'bg-gray-200 border-gray-300' 
              : 'bg-white border-gray-300 hover:border-gray-400'}
          border
        `}
      >
        {checked && (
          <Check 
            size={16} 
            className={`text-white transition-opacity duration-200 ${
              checked ? 'opacity-100' : 'opacity-0'
            }`} 
          />
        )}
      </div>
      {label && (
        <span className="ml-2 text-sm text-gray-700">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;