import { Theme } from '../context/ThemeTypes';

const THEME_STORAGE_KEY = 'vscode-theme-preference';

export function saveThemePreference(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.warn('Could not save theme preference', error);
  }
}

export function loadThemePreference(): Theme | null {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme ? JSON.parse(storedTheme) : null;
  } catch (error) {
    console.warn('Could not load theme preference', error);
    return null;
  }
}

export function clearThemePreference() {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Could not clear theme preference', error);
  }
}
