/**
 * Theme configuration types for VS Code extension and webview
 */

export interface ThemeColors {
  // Base colors
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Editor-specific colors
  editorBackground: string;
  editorForeground: string;
  buttonBackground: string;
  buttonForeground: string;
  
  // Additional editor colors
  editorLineHighlight: string;
  editorSelectionBackground: string;
  editorSelectionForeground: string;
  editorCursorForeground: string;
  editorIndentGuideBackground: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
  };
  lineHeight: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface ThemeConfiguration {
  type: 'light' | 'dark' | 'high-contrast';
  isDark: boolean;
  isHighContrast: boolean;
  colors: ThemeColors;
  typography: ThemeTypography;
}

/**
 * Create a default theme configuration
 * @param type Theme type (light, dark, or high-contrast)
 */
export function createDefaultTheme(type: 'light' | 'dark' | 'high-contrast' = 'light'): ThemeConfiguration {
  const isDark = type === 'dark' || type === 'high-contrast';
  const isHighContrast = type === 'high-contrast';

  return {
    type,
    isDark,
    isHighContrast,
    colors: {
      // Base colors
      primary: isDark ? '#3273dc' : '#3273dc',
      secondary: isDark ? '#6c757d' : '#6c757d',
      background: isDark ? '#1e1e1e' : '#ffffff',
      foreground: isDark ? '#d4d4d4' : '#000000',

      // Status colors
      success: isDark ? '#23d160' : '#48c774',
      warning: isDark ? '#ffd93d' : '#ffdd57',
      error: isDark ? '#ff3860' : '#f14668',
      info: isDark ? '#209cee' : '#3273dc',

      // Editor-specific colors
      editorBackground: isDark ? '#1e1e1e' : '#ffffff',
      editorForeground: isDark ? '#d4d4d4' : '#000000',
      buttonBackground: isDark ? '#1e1e1e' : '#f0f0f0',
      buttonForeground: isDark ? '#d4d4d4' : '#000000',
      
      // Additional editor colors
      editorLineHighlight: isDark ? '#2f2f2f' : '#f5f5f5',
      editorSelectionBackground: isDark ? '#3f3f3f' : '#e5e5e5',
      editorSelectionForeground: isDark ? '#d4d4d4' : '#000000',
      editorCursorForeground: isDark ? '#d4d4d4' : '#000000',
      editorIndentGuideBackground: isDark ? '#2f2f2f' : '#f5f5f5',
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      fontSize: {
        small: '0.75rem',
        medium: '1rem',
        large: '1.25rem'
      },
      lineHeight: {
        small: '1.25',
        medium: '1.5',
        large: '1.75'
      }
    }
  };
}

/**
 * Convert VS Code theme to our theme configuration
 * @param vscodeTheme VS Code theme configuration
 */
export function convertVSCodeThemeToThemeConfig(
  vscodeTheme: Record<string, string | undefined>
): ThemeConfiguration {
  const isDark = vscodeTheme['workbench.colorTheme']?.toLowerCase().includes('dark') || false;
  const isHighContrast = vscodeTheme['workbench.colorTheme']?.toLowerCase().includes('high contrast') || false;
  const type = isHighContrast ? 'high-contrast' : (isDark ? 'dark' : 'light');

  return {
    type,
    isDark,
    isHighContrast,
    colors: {
      // Base colors
      primary: vscodeTheme['activityBar.background'] || (isDark ? '#3273dc' : '#3273dc'),
      secondary: vscodeTheme['sideBar.background'] || (isDark ? '#6c757d' : '#6c757d'),
      background: vscodeTheme['editor.background'] || (isDark ? '#1e1e1e' : '#ffffff'),
      foreground: vscodeTheme['editor.foreground'] || (isDark ? '#d4d4d4' : '#000000'),

      // Status colors
      success: vscodeTheme['gitDecoration.addedResourceForeground'] || (isDark ? '#23d160' : '#48c774'),
      warning: vscodeTheme['editorWarning.foreground'] || (isDark ? '#ffd93d' : '#ffdd57'),
      error: vscodeTheme['editorError.foreground'] || (isDark ? '#ff3860' : '#f14668'),
      info: vscodeTheme['editorInfo.foreground'] || (isDark ? '#209cee' : '#3273dc'),

      // Editor-specific colors
      editorBackground: vscodeTheme['editor.background'] || (isDark ? '#1e1e1e' : '#ffffff'),
      editorForeground: vscodeTheme['editor.foreground'] || (isDark ? '#d4d4d4' : '#000000'),
      buttonBackground: vscodeTheme['button.background'] || (isDark ? '#1e1e1e' : '#f0f0f0'),
      buttonForeground: vscodeTheme['button.foreground'] || (isDark ? '#d4d4d4' : '#000000'),
      
      // Additional editor colors
      editorLineHighlight: vscodeTheme['editor.lineHighlightBackground'] || (isDark ? '#2f2f2f' : '#f5f5f5'),
      editorSelectionBackground: vscodeTheme['editor.selectionBackground'] || (isDark ? '#3f3f3f' : '#e5e5e5'),
      editorSelectionForeground: vscodeTheme['editor.selectionForeground'] || (isDark ? '#d4d4d4' : '#000000'),
      editorCursorForeground: vscodeTheme['editor.cursorForeground'] || (isDark ? '#d4d4d4' : '#000000'),
      editorIndentGuideBackground: vscodeTheme['editor.indentGuide.background'] || (isDark ? '#2f2f2f' : '#f5f5f5'),
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      fontSize: {
        small: '0.75rem',
        medium: '1rem',
        large: '1.25rem'
      },
      lineHeight: {
        small: '1.25',
        medium: '1.5',
        large: '1.75'
      }
    }
  };
}

/**
 * Generate CSS variables for the current theme
 * @param theme Theme configuration
 */
export function generateCSSVariables(theme: ThemeConfiguration): Record<string, string> {
  return {
    // Base colors
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-background': theme.colors.background,
    '--color-foreground': theme.colors.foreground,

    // Status colors
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--color-info': theme.colors.info,

    // Editor-specific colors
    '--color-editor-background': theme.colors.editorBackground,
    '--color-editor-foreground': theme.colors.editorForeground,
    '--color-button-background': theme.colors.buttonBackground,
    '--color-button-foreground': theme.colors.buttonForeground,
    
    // Additional editor colors
    '--color-editor-line-highlight': theme.colors.editorLineHighlight,
    '--color-editor-selection-background': theme.colors.editorSelectionBackground,
    '--color-editor-selection-foreground': theme.colors.editorSelectionForeground,
    '--color-editor-cursor-foreground': theme.colors.editorCursorForeground,
    '--color-editor-indent-guide-background': theme.colors.editorIndentGuideBackground,

    // Typography
    '--font-family': theme.typography.fontFamily,
    '--font-size-small': theme.typography.fontSize.small,
    '--font-size-medium': theme.typography.fontSize.medium,
    '--font-size-large': theme.typography.fontSize.large,
    '--line-height-small': theme.typography.lineHeight.small,
    '--line-height-medium': theme.typography.lineHeight.medium,
    '--line-height-large': theme.typography.lineHeight.large,

    // Theme type attributes
    '--theme-type': theme.type,
    '--is-dark': String(theme.isDark),
    '--is-high-contrast': String(theme.isHighContrast)
  };
}
