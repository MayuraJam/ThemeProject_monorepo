import React, { useState, useRef, useEffect } from 'react';
import { EllipsisVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ActionBtn<T = Record<string, unknown>> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  className?: string;
}

export interface Column<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  haveActionBtn?: boolean;
  actionBtns?: ActionBtn<T>[];
  totalPage: number;
  itemPerpage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Internal component for the responsive action dropdown
const ActionDropdown = <T,>({ row, actions }: { row: T; actions: ActionBtn<T>[] }) => {
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

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <EllipsisVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2">
          <div className="py-1">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false);
                  action.onClick(row);
                }}
                className={cn(
                  "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50",
                  action.className || "text-gray-700"
                )}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  haveActionBtn = false,
  actionBtns = [],
  totalPage,
  itemPerpage,
  currentPage,
  onPageChange,
  className
}: TableProps<T>) {
  return (
    <div className={cn("w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", className)}>
      {/* Table Container with overflow-x-auto for responsiveness */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" className="px-6 py-4 font-semibold whitespace-nowrap">
                  {col.header}
                </th>
              ))}
              {haveActionBtn && (
                <th scope="col" className="px-6 py-4 font-semibold text-right whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (haveActionBtn ? 1 : 0)} 
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                  {haveActionBtn && (
                    <td className="px-6 py-4 text-right">
                      {/* Desktop view: display buttons normally */}
                      <div className="hidden md:flex items-center justify-end gap-2">
                        {actionBtns.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => action.onClick(row)}
                            className={cn(
                              "inline-flex items-center px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                              action.className || "text-gray-700"
                            )}
                          >
                            {action.icon && <span className="mr-1.5">{action.icon}</span>}
                            {action.label}
                          </button>
                        ))}
                      </div>
                      
                      {/* Mobile view: display ellipsis dropdown */}
                      <div className="flex md:hidden justify-end">
                        <ActionDropdown row={row} actions={actionBtns} />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPage}</span> (
              <span className="font-medium">{itemPerpage}</span> items/page)
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              
              {/* Simple page numbers */}
              {Array.from({ length: totalPage }, (_, i) => i + 1)
                // Show a limited number of pages around current page for better UX
                .filter(page => page === 1 || page === totalPage || Math.abs(page - currentPage) <= 1)
                .map((page, index, array) => {
                  // Add ellipsis if there's a gap
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;
                  
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => onPageChange(page)}
                        className={cn(
                          "relative inline-flex items-center px-4 py-2 text-sm font-medium border",
                          currentPage === page
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        )}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                onClick={() => onPageChange(Math.min(totalPage, currentPage + 1))}
                disabled={currentPage >= totalPage || totalPage === 0}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
        
        {/* Mobile Pagination (Simplified) */}
        <div className="flex items-center justify-between w-full sm:hidden">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            {currentPage} / {totalPage}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPage, currentPage + 1))}
            disabled={currentPage >= totalPage || totalPage === 0}
            className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
