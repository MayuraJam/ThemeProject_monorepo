"use client";
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "./Input";

export interface DropdownItem {
  label: string;
  value: string | number;
}
// For backward compatibility
export type dataProp = DropdownItem;

interface CustomComponentProp {
  name: string;
  data?: DropdownItem[];
  dropdownLabel: string;
  isRequire: boolean;
  placeholder?: string;
  onSelectData: (value: string | number, name: string) => void;
  value : string | boolean | number|undefined;
  error?: string | boolean | number;
  disabled?:boolean
  
}

const DropdownSearch: React.FC<CustomComponentProp> = ({
  data = [],
  dropdownLabel = "",
  isRequire = false,
  placeholder = "",
  onSelectData,
  value = "",
  name = "",
  error = "",
  disabled = false
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isSelectedOption, setSelectedOption] = useState<DropdownItem>({
    label: "",
    value: 0,
  });
  const [searchSiteOption, setSearchSiteOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (value && data.length > 0) {
      const found = data.find((item) => item.value === value);
      if (found) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedOption(found);
      }
    } else if (!value) {
      setSelectedOption({ label: "", value: 0 });
    }
  }, [value, data]);

  const filterSiteOption = data.filter((op) => {
    const label = op?.label || "";
    const search = searchSiteOption || "";

    // If search is empty, show all items
    if (!search) return true;

    // If search matches the current selected label and dropdown just opened, show all items
    if (isOpenDropdown && search === isSelectedOption?.label) return true;

    return label.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const handleSelectOption = (option: DropdownItem) => {
    setSearchSiteOption("");
    setIsOpenDropdown(false);
    setSelectedOption(option);
    onSelectData(option.value, name);
  };

  const toggleDropdown = () => {
    if (!isOpenDropdown) {
      setSearchSiteOption(isSelectedOption?.label || "");
    }
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setSearchSiteOption("");
    setSelectedOption({ label: "", value: 0 });
    setIsOpenDropdown(false);
    onSelectData("", name);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full xl:max-w-75 ${isOpenDropdown ? "z-[100]" : "z-0"}`}>
      {(dropdownLabel || isRequire) && (
        <label className="block text-sm font-medium text-gray-700 mb-1 whitespace-nowrap text-start">
          {dropdownLabel} {isRequire && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {/* ส่วนของการค้นหา */}
      <div
        className={`relative border border-gray-300 rounded-md bg-white ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
        } ${error && "border-red-500 focus:ring-red-500"}`}
        onClick={() => !disabled && toggleDropdown()}
      >
        <Input
          name={name}
          placeholder={placeholder}
          className="text-sm"
          autoComplete="off"
          value={
            (isOpenDropdown ? searchSiteOption : isSelectedOption?.label) ?? ""
          }
          onChange={(e) => {
            if (disabled) return;
            setSearchSiteOption(e.target.value);
            setIsOpenDropdown(true);
          }}
          disabled ={disabled}
          // error={errors.username}
        />
       

        {/*ส่วนของ icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
          {isSelectedOption.label && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-0.5 rounded-full hover:bg-gray-100"
            >
              <X size={14} />
            </button>
          )}
          <div className="pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3 3 3-3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* option */}
        {isOpenDropdown && (
          <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filterSiteOption.map((option: DropdownItem, index: number) => (
              <div
                key={`${option.value}-${index}`}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 transition-colors text-start ${
                  option.value === isSelectedOption.value
                    ? "bg-blue-600 text-white font-bold"
                    : "hover:bg-blue-50 hover:text-blue-600 text-gray-900"
                }`}
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
         {error != "" && (
          <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
    </div>
  );
};

export { DropdownSearch as SearchDropdownOld }; // Temporary for internal use if needed

interface SearchDropdownProps {
  items: DropdownItem[];
  placeholder?: string;
  onSelect: (item: DropdownItem) => void;
  isDisable?: boolean;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  items,
  placeholder,
  onSelect,
  // isDisable,
}) => {
  return (
    <DropdownSearch
      name="search-dropdown"
      data={items}
      placeholder={placeholder}
      onSelectData={(val) => {
        const item = items.find((i) => i.value === val);
        if (item) onSelect(item);
      }}
      dropdownLabel=""
      isRequire={false}
      value="" // Or some state if needed, but legacy seems to be stateless or managed externally
    />
  );
};

export default DropdownSearch;
