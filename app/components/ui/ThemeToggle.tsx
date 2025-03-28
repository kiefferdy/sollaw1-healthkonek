'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../utils/ThemeProvider';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.theme-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative theme-dropdown">
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
        onClick={toggleDropdown}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : theme === 'dark' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => { setTheme('light'); setIsOpen(false); }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-700 font-medium text-primary' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <Sun className="h-4 w-4" />
              Light
            </button>
            <button
              onClick={() => { setTheme('dark'); setIsOpen(false); }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-700 font-medium text-primary' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
            <button
              onClick={() => { setTheme('system'); setIsOpen(false); }}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left ${theme === 'system' ? 'bg-gray-100 dark:bg-gray-700 font-medium text-primary' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <Monitor className="h-4 w-4" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;