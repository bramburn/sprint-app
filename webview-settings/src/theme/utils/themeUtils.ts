import { Theme, ThemeType } from '../context/ThemeTypes';

export function getThemeVariable(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--vscode-${name}`);
}

export function detectThemeType(): ThemeType {
  const body = document.body;
  
  if (body.classList.contains('vscode-high-contrast')) {
    return 'high-contrast';
  }
  
  return body.classList.contains('vscode-dark') ? 'dark' : 'light';
}

export function adjustColorBrightness(color: string, amount: number): string {
  // Simple color brightness adjustment utility
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  
  const r = Math.min(255, Math.max(0, ((num >> 16) & 255) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 255) + amount));
  const b = Math.min(255, Math.max(0, (num & 255) + amount));
  
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export function getContrastColor(backgroundColor: string): string {
  // Simple contrast color calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export function customizeTheme(theme: Theme, customization: Partial<Theme>): Theme {
  return {
    ...theme,
    ...customization
  };
}

export function generateContrastTheme(theme: Theme): Theme {
  // Implement a basic contrast theme generation
  const contrastColors = {
    editorBackground: '#000000',
    editorForeground: '#FFFFFF',
    // Add other high-contrast color mappings
  };

  return {
    ...theme,
    type: 'high-contrast',
    colors: {
      ...theme.colors,
      ...contrastColors
    }
  };
}
