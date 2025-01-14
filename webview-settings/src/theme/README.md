# Theme System

## Overview
This theme system provides a robust, flexible approach to theming in the VS Code extension, ensuring consistent styling across components.

## Key Features
- Automatic VS Code theme detection
- Persistent theme preference storage
- Accessibility-aware color calculations
- Themed base components
- Easy theme integration utilities

## Components

### Theme Context
- `ThemeContext.ts`: Provides theme state management
- `ThemeProvider.tsx`: Manages theme changes and detection
- `ThemeTypes.ts`: Defines theme interfaces

### Hooks
- `useTheme()`: Access current theme and theme-related utilities

### Utilities
- `themeUtils.ts`: Color manipulation and theme detection
- `themeStorage.ts`: Theme preference persistence
- `accessibility.ts`: Contrast and color accessibility helpers
- `componentThemeIntegration.ts`: Theme application helpers

### Base Components
- `ThemedButton`: Themed button with variant support
- `ThemedInput`: Themed input with error and variant states
- `ThemedSelect`: Themed select component
- `ThemedWrapper`: Generic themed wrapper for components

## Usage Examples

### Using Theme Hook
```typescript
import { useTheme } from './theme/hooks/useTheme';

function MyComponent() {
  const { theme, isDark } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.editorBackground,
      color: theme.colors.editorForeground 
    }}>
      {isDark ? 'Dark Mode' : 'Light Mode'}
    </div>
  );
}
```

### Using Themed Components
```typescript
import { ThemedButton } from './theme/components/ThemedButton';
import { ThemedInput } from './theme/components/ThemedInput';

function FormComponent() {
  return (
    <form>
      <ThemedInput 
        placeholder="Enter your name"
        variant="outlined"
      />
      <ThemedButton 
        variant="primary"
        type="submit"
      >
        Submit
      </ThemedButton>
    </form>
  );
}
```

## Best Practices
1. Use `useTheme()` for theme-aware styling
2. Prefer themed base components
3. Use `applyThemeStyles()` for custom component theming
4. Implement accessibility checks with theme utilities

## Performance Considerations
- Theme context uses `useMemo` to minimize re-renders
- Lightweight theme detection mechanism
- Minimal overhead for theme changes

## Accessibility
- WCAG contrast ratio calculations
- Automatic text color selection
- Support for high-contrast modes

## Future Improvements
- More themed base components
- Enhanced color manipulation
- Expanded theme type support
