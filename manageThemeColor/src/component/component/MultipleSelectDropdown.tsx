import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Option {
  label: string;
  value: string;
}

interface MultipleSelectDropdownProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultipleSelectDropdown: React.FC<MultipleSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  const selectedLabels = options
    .filter(opt => selectedValues.includes(opt.value))
    .map(opt => opt.label)
    .join(', ');

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-left bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
      >
        <span className={cn("block truncate", !selectedLabels && "text-gray-400")}>
          {selectedLabels || placeholder}
        </span>
        <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-200", isOpen && "transform rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1.5 bg-white border border-gray-100 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2 py-1 max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">No options found</div>
          ) : (
            options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleOption(option.value)}
                  className="flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-blue-50/50 transition-colors"
                >
                  <span className={cn("text-gray-700", isSelected && "font-medium text-blue-600")}>
                    {option.label}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
