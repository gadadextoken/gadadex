import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'buy' | 'sell' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gada-midnight';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
    md: 'text-sm px-4 py-2.5 h-10 gap-2',
    lg: 'text-base px-6 py-3 h-12 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-gada-violet to-gada-magenta text-white hover:opacity-95 shadow-glow-purple focus:ring-gada-electric',
    secondary: 'bg-gada-elevated text-white hover:bg-gada-border border border-gada-borderLight focus:ring-gada-violet',
    outline: 'bg-transparent text-gada-muted hover:text-white border border-gada-border hover:border-gada-violet focus:ring-gada-violet',
    buy: 'bg-gada-up hover:brightness-110 text-gada-midnight font-bold shadow-glow-up focus:ring-gada-up',
    sell: 'bg-gada-down hover:brightness-110 text-white font-bold shadow-glow-down focus:ring-gada-down',
    ghost: 'bg-transparent text-gada-muted hover:text-white hover:bg-gada-elevated focus:ring-gada-violet',
    danger: 'bg-gada-down/20 text-gada-down border border-gada-down/40 hover:bg-gada-down/30 focus:ring-gada-down',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
