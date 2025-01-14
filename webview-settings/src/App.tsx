import React from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/useTheme';
import { useVSCode } from '@sprint-app/shared/react/hooks/vscode-hooks';

const App: React.FC = () => {
  const { theme, updateTheme } = useTheme();
  const { postMessage } = useVSCode();

  const handleThemeToggle = () => {
    const newTheme = {
      background: theme.background === 'var(--vscode-editor-background)' 
        ? 'var(--vscode-sideBar-background)' 
        : 'var(--vscode-editor-background)'
    };
    
    updateTheme(newTheme);
    
    // Optional: Send theme change message to VS Code extension
    postMessage({
      command: 'theme-variant-changed',
      payload: newTheme
    });
  };

  return (
    <div 
      className="themed-component"
      style={{
        padding: '20px',
        borderRadius: '8px',
        margin: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <h1>Theme Integration Test</h1>
      <p>This is a simple themed container demonstrating VS Code theme integration.</p>
      <button 
        onClick={handleThemeToggle}
        className="themed-button"
        style={{
          border: 'none',
          padding: '10px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
      >
        Toggle Theme Variant
      </button>
    </div>
  );
};

export default App;