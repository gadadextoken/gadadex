import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'green' | 'red' | 'gray' | 'simulation';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const variantStyles = {
    purple: 'bg-gada-violet/15 text-gada-magenta border border-gada-violet/30',
    green: 'bg-gada-up/15 text-gada-up border border-gada-up/30',
    red: 'bg-gada-down/15 text-gada-down border border-gada-down/30',
    gray: 'bg-gada-elevated text-gada-muted border border-gada-border',
    simulation: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
