import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  detectThemeType, 
  adjustColorBrightness, 
  getContrastColor 
} from '../utils/themeUtils';

describe('Theme Utilities', () => {
  const originalClassList = Array.from(document.body.classList);

  beforeEach(() => {
    // Remove all existing classes
    document.body.classList.remove(...originalClassList);
  });

  afterEach(() => {
    // Restore original classList
    document.body.classList.remove(...document.body.classList);
    document.body.classList.add(...originalClassList);
  });

  it('should detect theme type', () => {
    document.body.classList.add('vscode-dark');
    expect(detectThemeType()).toBe('dark');
    
    document.body.classList.remove('vscode-dark');
    document.body.classList.add('vscode-light');
    expect(detectThemeType()).toBe('light');
    
    document.body.classList.remove('vscode-light');
    document.body.classList.add('vscode-high-contrast');
    expect(detectThemeType()).toBe('high-contrast');
  });

  it('should adjust color brightness', () => {
    expect(adjustColorBrightness('#000000', 50)).toBe('#323232');
    expect(adjustColorBrightness('#FFFFFF', -50)).toBe('#7F7F7F');
  });

  it('should get contrast color', () => {
    expect(getContrastColor('#000000')).toBe('#FFFFFF');
    expect(getContrastColor('#FFFFFF')).toBe('#000000');
  });
});
