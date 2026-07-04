import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Option {
  label: string;
  value: string;
}

interface MultipleChipDropdownProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultipleChipDropdown: React.FC<MultipleChipDropdownProps> = ({
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

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selectedValues.filter(v => v !== value));
  };

  const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[46px] flex flex-wrap items-center gap-1.5 w-full px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-gray-300 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200"
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-400 pl-1">{placeholder}</span>
        ) : (
          selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full animate-in zoom-in-95 duration-200"
            >
              {opt.label}
              <button
                type="button"
                onClick={(e) => removeOption(e, opt.value)}
                className="p-0.5 rounded-full hover:bg-blue-200/50 transition-colors focus:outline-none"
              >
                <X className="w-3.5 h-3.5 text-blue-600" />
              </button>
            </span>
          ))
        )}
        <div className="ml-auto pl-2">
          <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-200", isOpen && "transform rotate-180")} />
        </div>
      </div>

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
