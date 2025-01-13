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
