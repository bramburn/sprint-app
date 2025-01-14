import React, { createContext, useState } from 'react';
import { ThemeConfiguration, defaultTheme } from '../types';

interface ThemeContextType {
  theme: ThemeConfiguration;
  updateTheme: (theme: Partial<ThemeConfiguration>) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfiguration>(defaultTheme);

  const updateTheme = (newTheme: Partial<ThemeConfiguration>) => {
    const updatedTheme = { ...theme, ...newTheme };
    setTheme(updatedTheme);

    // Update CSS variables dynamically
    Object.entries(updatedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--vscode-theme-${key}`, value as string);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
