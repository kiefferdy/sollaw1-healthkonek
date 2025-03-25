'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/app/utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className,
  ...props
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium';
  
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };
  
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
  
  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}