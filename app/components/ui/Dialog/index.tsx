'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md'
}) => {
  const [isShowing, setIsShowing] = useState(isOpen);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [isOpen, onClose]);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsShowing(true);
    } else {
      const timer = setTimeout(() => setIsShowing(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isShowing) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-200',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full transition-all duration-200 transform',
          sizeClasses[size],
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const DialogFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'flex justify-end items-center space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};
