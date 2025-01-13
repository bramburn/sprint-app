import React, { useState } from 'react';
import { useTheme } from '../theme/hooks/useTheme';
import { 
  customizeTheme, 
  generateContrastTheme
} from '../theme/utils/themeUtils';
import { ThemedWrapper } from '../theme/components/ThemedWrapper';
import { ThemedButton } from '../theme/components/ThemedButton';
import { ThemedInput } from '../theme/components/ThemedInput';
import { ThemedSelect } from '../theme/components/ThemedSelect';
import { Theme, ThemeColors, ThemeType } from '../theme/context/ThemeTypes';

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [customization, setCustomization] = useState<Theme>({
    type: theme.type,
    colors: {
      editorBackground: theme.colors.editorBackground,
      editorForeground: theme.colors.editorForeground,
      buttonBackground: theme.colors.buttonBackground,
      buttonForeground: theme.colors.buttonForeground,
      buttonHoverBackground: theme.colors.buttonHoverBackground,
      inputBackground: theme.colors.inputBackground,
      inputForeground: theme.colors.inputForeground,
      inputBorder: theme.colors.inputBorder,
      focusBorder: theme.colors.focusBorder,
      listActiveSelection: theme.colors.listActiveSelection,
      listHoverBackground: theme.colors.listHoverBackground,
      border: theme.colors.border
    }
  });

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setCustomization(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value
      }
    }));
  };

  const applyCustomTheme = () => {
    setTheme(customization);
  };

  const applyContrastTheme = () => {
    const contrastTheme = generateContrastTheme(theme);
    setTheme(contrastTheme);
  };

  const resetToDefault = () => {
    setTheme({
      type: theme.type,
      colors: theme.colors
    });
  };

  return (
    <ThemedWrapper className="theme-settings-container">
      <h1>Theme Settings</h1>
      
      <section>
        <h2>Theme Type</h2>
        <ThemedSelect 
          value={theme.type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTheme({ ...theme, type: e.target.value as ThemeType })}
          options={['light', 'dark', 'high-contrast']}
          name="themeType"
          required={true}
        >
          {['light', 'dark', 'high-contrast'].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </ThemedSelect>
      </section>

      <section>
        <h2>Color Customization</h2>
        
        <div className="color-input-group">
          <label>Editor Background</label>
          <ThemedInput 
            type="color"
            value={customization.colors.editorBackground}
            onChange={(e) => handleColorChange('editorBackground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Editor Foreground</label>
          <ThemedInput 
            type="color"
            value={customization.colors.editorForeground}
            onChange={(e) => handleColorChange('editorForeground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Button Background</label>
          <ThemedInput 
            type="color"
            value={customization.colors.buttonBackground}
            onChange={(e) => handleColorChange('buttonBackground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Button Foreground</label>
          <ThemedInput 
            type="color"
            value={customization.colors.buttonForeground}
            onChange={(e) => handleColorChange('buttonForeground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Button Hover Background</label>
          <ThemedInput 
            type="color"
            value={customization.colors.buttonHoverBackground}
            onChange={(e) => handleColorChange('buttonHoverBackground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Input Background</label>
          <ThemedInput 
            type="color"
            value={customization.colors.inputBackground}
            onChange={(e) => handleColorChange('inputBackground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Input Foreground</label>
          <ThemedInput 
            type="color"
            value={customization.colors.inputForeground}
            onChange={(e) => handleColorChange('inputForeground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Input Border</label>
          <ThemedInput 
            type="color"
            value={customization.colors.inputBorder}
            onChange={(e) => handleColorChange('inputBorder', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Focus Border</label>
          <ThemedInput 
            type="color"
            value={customization.colors.focusBorder}
            onChange={(e) => handleColorChange('focusBorder', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>List Active Selection</label>
          <ThemedInput 
            type="color"
            value={customization.colors.listActiveSelection}
            onChange={(e) => handleColorChange('listActiveSelection', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>List Hover Background</label>
          <ThemedInput 
            type="color"
            value={customization.colors.listHoverBackground}
            onChange={(e) => handleColorChange('listHoverBackground', e.target.value)}
          />
        </div>

        <div className="color-input-group">
          <label>Border</label>
          <ThemedInput 
            type="color"
            value={customization.colors.border}
            onChange={(e) => handleColorChange('border', e.target.value)}
          />
        </div>
      </section>

      <section className="theme-action-buttons">
        <ThemedButton 
          variant="primary"
          onClick={applyCustomTheme}
        >
          Apply Custom Theme
        </ThemedButton>

        <ThemedButton 
          variant="secondary"
          onClick={applyContrastTheme}
        >
          High Contrast Mode
        </ThemedButton>

        <ThemedButton 
          variant="tertiary"
          onClick={resetToDefault}
        >
          Reset to Default
        </ThemedButton>
      </section>
    </ThemedWrapper>
  );
};
