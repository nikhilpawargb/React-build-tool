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
    
    // Add the effective theme class
    root.classList.add(effectiveTheme);
    setIsDarkMode(effectiveTheme === 'dark');
    
    // Store theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes when theme is 'system'
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
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
