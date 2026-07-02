import * as React from "react";
import { cn } from "@/utils/util";
import { Search, X } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, value, onClear, onChange, ...props }, ref) => {
    
    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        // Fallback: trigger onChange with empty string if onClear not provided
        const event = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const hasValue = value && String(value).length > 0;

    return (
      <div className="w-full space-y-1">
        {label && <label className="text-base font-medium text-gray-700">{label}</label>}
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={cn(
              "block w-full rounded-md border-0 py-2 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 text-base sm:leading-6",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
            <Search size={20} />
          </div>
          {hasValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";