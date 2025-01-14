import { createContext, useContext } from 'react';
import { 
  ThemeConfiguration, 
  createDefaultTheme,
  generateCSSVariables 
} from '../../theme/types';
// Theme context for global theme management
export const ThemeContext = createContext<{
  theme: ThemeConfiguration;
  updateTheme: (newTheme?: Partial<ThemeConfiguration>) => void;
}>({
  theme: createDefaultTheme(),
  updateTheme: () => {}
});


// Custom hook to use theme in components
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

// Utility function to get current theme CSS variables
export function getCurrentThemeCSSVariables(): Record<string, string> {
  return generateCSSVariables(createDefaultTheme());
}
