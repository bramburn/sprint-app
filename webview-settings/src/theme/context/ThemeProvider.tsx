import React, { useState, useEffect, ReactNode, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import { Theme, ThemeType } from './ThemeTypes';
import { loadThemePreference, saveThemePreference } from '../utils/themeStorage';
import { detectThemeType } from '../utils/themeUtils';
import { ThemePerformanceMonitor } from '../utils/themePerformance';
import { safeThemeApplication, getDefaultTheme } from '../utils/themeErrorHandler';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const performanceMonitor = ThemePerformanceMonitor.getInstance();

  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = loadThemePreference();
    const detectedType = detectThemeType();

    if (storedTheme) {
      return safeThemeApplication(storedTheme);
    }

    return safeThemeApplication({
      type: detectedType,
      colors: getDefaultTheme().colors
    });
  });

  const themeContextValue = useMemo(() => ({
    theme,
    setTheme: (newTheme: Theme) => {
      const endThemeChange = performanceMonitor.startThemeChange();
      
      const safeTheme = safeThemeApplication(newTheme);
      setTheme(safeTheme);
      saveThemePreference(safeTheme);
      
      endThemeChange();
    }
  }), [theme]);

  useEffect(() => {
    const handleThemeChange = () => {
      const currentType = detectThemeType();
      if (currentType !== theme.type) {
        const endThemeChange = performanceMonitor.startThemeChange();
        
        setTheme(prevTheme => safeThemeApplication({
          type: currentType,
          colors: prevTheme.colors
        }));
        
        endThemeChange();
      }
    };

    const observer = new MutationObserver(handleThemeChange);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    handleThemeChange();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
