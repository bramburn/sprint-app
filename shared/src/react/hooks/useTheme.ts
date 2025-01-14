import { useState, useEffect, useCallback } from 'react';
import { 
  ThemeConfiguration, 
  createDefaultTheme,
  generateCSSVariables 
} from '@sprint-app/shared/src/theme/types';

/**
 * Theme hook for managing theme state and synchronization
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeConfiguration>(createDefaultTheme());

  // Apply theme to document when theme changes
  useEffect(() => {
    const cssVariables = generateCSSVariables(theme);
    
    // Apply CSS variables to document root
    Object.entries(cssVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  // Simplified theme application method
  const applyTheme = useCallback((newTheme: ThemeConfiguration) => {
    setTheme(newTheme);
  }, []);

  return { 
    theme, 
    applyTheme 
  };
}
