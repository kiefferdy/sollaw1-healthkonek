'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/app/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  roundedCorners?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  hoverEffect?: boolean;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  roundedCorners = 'md',
  hoverEffect = false,
  className,
  ...props
}: CardProps) {
  const baseClasses = 'bg-white';
  
  const variantClasses = {
    default: 'shadow',
    bordered: 'border border-gray-200',
    elevated: 'shadow-md',
  };
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  
  const hoverClasses = hoverEffect ? 'transition-shadow hover:shadow-lg' : '';
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        roundedClasses[roundedCorners],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function CardTitle({ children, className, ...props }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-medium text-gray-900', className)} {...props}>
      {children}
    </h3>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('text-sm text-gray-700', className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div className={cn('mt-4 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}