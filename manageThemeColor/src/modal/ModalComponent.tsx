import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subTitle?: string;
    headerIcon?: ReactNode;
    children: ReactNode;
}

export default function ModalComponent({
    isOpen,
    onClose,
    title = "Modal title",
    subTitle,
    headerIcon,
    children
}: ModalProps) {

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4">
            {/* Modal Container */}
            <div
                className="bg-white dark:bg-zinc-900 w-full max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                {/* Modal Header*/}
                <div className="bg-white dark:bg-[#badf3a] px-6 py-8 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 dark:bg-black/20 dark:hover:bg-black/30 rounded-full transition-colors text-black focus:outline-none cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>

                    <div className="flex items-center gap-4">
                        {headerIcon && (
                            <div className="w-14 h-14 bg-black/10 dark:bg-black/20 rounded-2xl flex items-center justify-center text-black flex-shrink-0">
                                {headerIcon}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-black leading-tight">{title}</h2>
                            {subTitle && (
                                <p className="text-black/70 dark:text-black/70 font-medium text-sm mt-1">
                                    {subTitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[70vh] p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
