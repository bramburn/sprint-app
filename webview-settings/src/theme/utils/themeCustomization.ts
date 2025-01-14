import { Theme } from '../context/ThemeTypes';
import { safeThemeApplication } from './themeErrorHandler';

export interface ThemeCustomizationOptions {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export function customizeTheme(
  baseTheme: Theme, 
  customization: ThemeCustomizationOptions
): Theme {
  const customizedTheme: Theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      buttonBackground: customization.primaryColor || baseTheme.colors.buttonBackground,
      buttonHoverBackground: customization.secondaryColor || baseTheme.colors.buttonHoverBackground,
      editorBackground: customization.backgroundColor || baseTheme.colors.editorBackground,
      editorForeground: customization.textColor || baseTheme.colors.editorForeground
    }
  };

  return safeThemeApplication(customizedTheme);
}

export function generateContrastTheme(baseTheme: Theme): Theme {
  const contrastTheme: Theme = {
    type: 'high-contrast',
    colors: {
      ...baseTheme.colors,
      editorBackground: '#000000',
      editorForeground: '#FFFFFF',
      buttonBackground: '#FFFFFF',
      buttonForeground: '#000000',
      inputBackground: '#000000',
      inputForeground: '#FFFFFF',
      inputBorder: '#FFFFFF',
      listActiveSelection: '#FFFFFF',
      listHoverBackground: '#333333'
    }
  };

  return safeThemeApplication(contrastTheme);
}

export function extractThemeVariables(theme: Theme): Record<string, string> {
  return {
    '--theme-editor-bg': theme.colors.editorBackground,
    '--theme-editor-fg': theme.colors.editorForeground,
    '--theme-button-bg': theme.colors.buttonBackground,
    '--theme-button-fg': theme.colors.buttonForeground,
    '--theme-input-bg': theme.colors.inputBackground,
    '--theme-input-fg': theme.colors.inputForeground
  };
}
