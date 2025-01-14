import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {
    theme: context.theme,
    setTheme: context.setTheme,
    isDark: context.theme.type === 'dark',
    isHighContrast: context.theme.type === 'high-contrast'
  };
}
