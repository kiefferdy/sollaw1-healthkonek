'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  duration = 4000,
  onClose,
  isVisible,
}) => {
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, isVisible]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const typeClasses = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center p-4 rounded-md shadow-md border transition-all transform',
        typeClasses[type],
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-2 opacity-0 pointer-events-none'
      )}
    >
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="flex-1 mr-2">
        {message}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  children: React.ReactNode;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ children }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {children}
    </div>
  );
};

interface UseToastReturn {
  toast: (type: ToastType, message: string, duration?: number) => void;
  toastComponent: React.ReactNode;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<Array<{ id: string; type: ToastType; message: string; duration?: number; isVisible: boolean }>>([]);

  const toast = (type: ToastType, message: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, duration, isVisible: true }]);
  };

  const closeToast = (id: string) => {
    setToasts((prev) => 
      prev.map((toast) => 
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );
    
    // Remove from state after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  };

  const toastComponent = (
    <>
      {toasts.map(({ id, type, message, duration, isVisible }) => (
        <Toast
          key={id}
          type={type}
          message={message}
          duration={duration}
          onClose={() => closeToast(id)}
          isVisible={isVisible}
        />
      ))}
    </>
  );

  return { toast, toastComponent };
};
