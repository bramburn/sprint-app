/**
 * Theme type definitions for VS Code extension
 */

export interface ThemeConfiguration {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export const defaultTheme: ThemeConfiguration = {
  background: 'var(--vscode-editor-background)',
  foreground: 'var(--vscode-editor-foreground)',
  primary: 'var(--vscode-activityBar-background)',
  secondary: 'var(--vscode-sideBar-background)',
  accent: 'var(--vscode-button-background)',
  success: 'var(--vscode-statusBar-background)',
  warning: 'var(--vscode-editorWarning-foreground)',
  error: 'var(--vscode-editorError-foreground)',
  info: 'var(--vscode-editorInfo-foreground)'
};

export function createDefaultTheme(): ThemeConfiguration {
  return defaultTheme;
}

export function generateCSSVariables(theme: ThemeConfiguration): Record<string, string> {
  return {
    '--theme-background': theme.background,
    '--theme-foreground': theme.foreground,
    '--theme-primary': theme.primary,
    '--theme-secondary': theme.secondary,
    '--theme-accent': theme.accent,
    '--theme-success': theme.success,
    '--theme-warning': theme.warning,
    '--theme-error': theme.error,
    '--theme-info': theme.info
  };
}

export function convertVSCodeThemeToThemeConfig(vscodeTheme: any): ThemeConfiguration {
  return {
    background: vscodeTheme.background || 'var(--vscode-editor-background)',
    foreground: vscodeTheme.foreground || 'var(--vscode-editor-foreground)',
    primary: vscodeTheme.primary || 'var(--vscode-activityBar-background)',
    secondary: vscodeTheme.secondary || 'var(--vscode-sideBar-background)',
    accent: vscodeTheme.accent || 'var(--vscode-button-background)',
    success: vscodeTheme.success || 'var(--vscode-statusBar-background)',
    warning: vscodeTheme.warning || 'var(--vscode-editorWarning-foreground)',
    error: vscodeTheme.error || 'var(--vscode-editorError-foreground)',
    info: vscodeTheme.info || 'var(--vscode-editorInfo-foreground)'
  };
}
