import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useDarkMode() {
  // Get initial theme from localStorage or default to 'system'
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  // Determine if dark mode should be active
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    
    // System preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      effectiveTheme = theme;
    }
    
    // Apply the theme class
    root.classList.add(effectiveTheme);
    setIsDarkMode(effectiveTheme === 'dark');
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes when theme is 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      const newTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.add(newTheme);
      setIsDarkMode(newTheme === 'dark');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleDarkMode = () => {
    if (theme === 'system') {
      // If system, toggle to opposite of current system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const setLightMode = () => setTheme('light');
  const setDarkModeOnly = () => setTheme('dark');
  const setSystemMode = () => setTheme('system');

  return {
    theme,
    isDarkMode,
    toggleDarkMode,
    setLightMode,
    setDarkMode: setDarkModeOnly,
    setSystemMode,
    setTheme,
  };
}
