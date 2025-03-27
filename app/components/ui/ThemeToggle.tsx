'use client';

import { useTheme } from '@/app/utils/ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md ${
          theme === 'light' 
            ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md ${
          theme === 'dark'
            ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md ${
          theme === 'system'
            ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
        aria-label="System preference"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}