"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";

interface DropdownItem {
  value: string | number;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
  placeholder?: string;
  onSelect: (value: string | number, name: string) => void;
  value?: string | number | boolean;
  disabled?: boolean;
  isRequire?: boolean;
  error?: string | boolean;
  name?:string
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  placeholder = "เลือกรายการ...",
  onSelect,
  isRequire = false,
  value,
  error = "",
  disabled = false,
  name=""
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derive selected item from value prop
  const selectedItem = useMemo(() => {
    return items.find((item) => item.value === value) || null;
  }, [items, value]);

  // Handle closing the dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    setIsOpen(false);
    onSelect(item.value, name);
  };

  return (
    <div>
      <label>{name} {isRequire && <span className="text-red-500">*</span>}</label>
      <div ref={dropdownRef} className="relative w-full">
        {/* Input Box */}
        <div className="relative">
          <div
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`w-full h-10 rounded-lg border px-4 py-2.5 text-sm shadow-sm outline-none transition-all cursor-pointer flex items-center justify-between
              ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" : "bg-white text-gray-900 border-gray-300 hover:border-gray-400"}
              ${isOpen ? "ring-2 ring-blue-100 border-blue-500" : ""}
              ${error ? "border-red-500 ring-red-50 ring-2" : ""}
            `}
          >
            <span className={`truncate ${!selectedItem ? "text-gray-400" : "text-gray-900"}`}>
              {selectedItem ? selectedItem.label : placeholder}
            </span>

            {!disabled && (
              <svg
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Floating Dropdown Results Menu */}
        {isOpen && (
          <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.value.toString()}
                  onClick={() => handleItemClick(item)}
                  className={`cursor-pointer rounded-md px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                    value === item.value
                      ? "bg-blue-50 font-medium text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-center text-sm text-gray-500">
                ไม่พบข้อมูล
              </li>
            )}
          </ul>
        )}
        
        {error && typeof error === "string" && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};
