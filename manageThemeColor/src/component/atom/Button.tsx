import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    
    // Base classes applicable to all buttons
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';
    
    // Variant classes for color and style
    const variants = {
      primary: 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 focus:ring-zinc-900 dark:focus:ring-white focus:ring-offset-white dark:focus:ring-offset-zinc-900',
      secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 focus:ring-zinc-500 focus:ring-offset-white dark:focus:ring-offset-zinc-900',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 focus:ring-offset-white dark:focus:ring-offset-zinc-900',
      ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 focus:ring-zinc-500 focus:ring-offset-white dark:focus:ring-offset-zinc-900',
      outline: 'bg-transparent border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 focus:ring-zinc-500 focus:ring-offset-white dark:focus:ring-offset-zinc-900',
    };

    // Size classes for padding and font size
    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-sm sm:text-base px-4 py-2 gap-2',
      lg: 'text-base sm:text-lg px-6 py-3 gap-2.5',
      icon: 'p-2 flex-shrink-0', // for icon-only buttons without text
    };

    // Combine all classes
    const classes = [
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {leftIcon && <span className="flex-shrink-0 flex items-center">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {rightIcon && <span className="flex-shrink-0 flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
