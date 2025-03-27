'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // First, check if there's a theme preference in localStorage
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('dark', 'light');
    
    // Handle theme application
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      // Add the theme class to the html element
      root.classList.add(systemTheme);
      
      // Set the data-theme for daisyUI
      root.setAttribute('data-theme', systemTheme === 'dark' ? 'healthkonek_dark' : 'healthkonek');
    } else {
      // Add the theme class to the html element
      root.classList.add(theme);
      
      // Set the data-theme for daisyUI
      root.setAttribute('data-theme', theme === 'dark' ? 'healthkonek_dark' : 'healthkonek');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Add listener for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        const isDark = mediaQuery.matches;
        
        // Clear existing theme classes
        root.classList.remove('dark', 'light');
        
        // Add the appropriate theme class
        root.classList.add(isDark ? 'dark' : 'light');
        
        // Set daisyUI theme
        root.setAttribute('data-theme', isDark ? 'healthkonek_dark' : 'healthkonek');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Prevent flash of default theme while loading
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}