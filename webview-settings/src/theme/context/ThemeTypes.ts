export type ThemeType = 'light' | 'dark' | 'high-contrast';

export interface ThemeColors {
  [key: string]: string;  // Index signature
  editorBackground: string;
  editorForeground: string;
  buttonBackground: string;
  buttonForeground: string;
  buttonHoverBackground: string;
  inputBackground: string;
  inputForeground: string;
  inputBorder: string;
  focusBorder: string;
  listActiveSelection: string;
  listHoverBackground: string;
  border: string;
}

export interface Theme {
  type: ThemeType;
  colors: ThemeColors;
}

export interface ThemeConfiguration {
  type: ThemeType;
  colors: {
    editorBackground: string;
    editorForeground: string;
    buttonBackground: string;
    buttonForeground: string;
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
  };
}

export function convertThemeConfigToTheme(config: ThemeConfiguration): Theme {
  return {
    type: config.type,
    colors: {
      editorBackground: config.colors.editorBackground,
      editorForeground: config.colors.editorForeground,
      buttonBackground: config.colors.buttonBackground,
      buttonForeground: config.colors.buttonForeground,
      buttonHoverBackground: config.colors.buttonBackground, // Fallback, you might want to adjust
      inputBackground: config.colors.background, // Fallback, you might want to adjust
      inputForeground: config.colors.foreground, // Fallback, you might want to adjust
      inputBorder: config.colors.primary, // Fallback, you might want to adjust
      focusBorder: config.colors.primary,
      listActiveSelection: config.colors.secondary,
      listHoverBackground: config.colors.secondary,
      border: config.colors.primary
    }
  };
}
