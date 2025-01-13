import { Theme } from '../context/ThemeTypes';

export function applyThemeStyles(theme: Theme, baseStyles: React.CSSProperties = {}): React.CSSProperties {
  return {
    ...baseStyles,
    backgroundColor: theme.colors.editorBackground,
    color: theme.colors.editorForeground,
    borderColor: theme.colors.border,
    transition: 'all 0.2s ease-in-out'
  };
}

export function getThemedClassName(baseClasses: string = ''): string {
  return `themed-component ${baseClasses}`.trim();
}

export function getAccessibleTextColor(backgroundColor: string): string {
  // Simple luminance-based contrast calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
