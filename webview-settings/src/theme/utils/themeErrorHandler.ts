import { Theme, ThemeType } from '../context/ThemeTypes';

export class ThemeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ThemeError';
  }
}

export function validateTheme(theme: Theme): boolean {
  try {
    if (!theme.type) {
      throw new ThemeError('Theme type is required');
    }

    const validTypes: ThemeType[] = ['light', 'dark', 'high-contrast'];
    if (!validTypes.includes(theme.type)) {
      throw new ThemeError(`Invalid theme type: ${theme.type}`);
    }

    const requiredColorKeys = [
      'editorBackground', 'editorForeground', 
      'buttonBackground', 'buttonForeground'
    ];

    requiredColorKeys.forEach(key => {
      if (!(key in theme.colors)) {
        console.warn(`Theme color key '${key}' not found`);
        return;
      }
      if (!theme.colors[key]) {
        throw new ThemeError(`Missing required color: ${key}`);
      }
    });

    return true;
  } catch (error) {
    console.error('Theme Validation Error:', error);
    return false;
  }
}

export function getDefaultTheme(): Theme {
  return {
    type: 'dark',
    colors: {
      editorBackground: '#1E1E1E',
      editorForeground: '#D4D4D4',
      buttonBackground: '#0E639C',
      buttonForeground: '#FFFFFF',
      buttonHoverBackground: '#1177BB',
      inputBackground: '#3C3C3C',
      inputForeground: '#CCCCCC',
      inputBorder: '#555555',
      listActiveSelection: '#094771',
      listHoverBackground: '#2A2D2E',
      border: '#454545',
      focusBorder: '#007FD4'
    }
  };
}

export function safeThemeApplication(theme: Theme): Theme {
  if (validateTheme(theme)) {
    return theme;
  }
  
  console.warn('Invalid theme provided. Falling back to default theme.');
  return getDefaultTheme();
}
