import { createContext } from 'react';
import { Theme } from './ThemeTypes';

// Default theme values
const defaultThemeColors = {
  editorBackground: 'transparent',
  editorForeground: 'inherit',
  buttonBackground: 'var(--vscode-button-background)',
  buttonForeground: 'var(--vscode-button-foreground)',
  buttonHoverBackground: 'var(--vscode-button-hoverBackground)',
  inputBackground: 'var(--vscode-input-background)',
  inputForeground: 'var(--vscode-input-foreground)',
  inputBorder: 'var(--vscode-input-border)',
  listActiveSelection: 'var(--vscode-list-activeSelectionBackground)',
  listHoverBackground: 'var(--vscode-list-hoverBackground)',
  border: 'var(--vscode-contrastBorder)',
  focusBorder: 'var(--vscode-focusBorder)'
};

const defaultTheme: Theme = {
  type: 'dark',
  colors: defaultThemeColors
};

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {}
});
