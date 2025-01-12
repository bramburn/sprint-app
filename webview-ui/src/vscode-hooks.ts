import type { WebviewApi } from 'vscode-webview';
import { useContext } from 'react';
import { VSCodeContext } from './vscode-context';
import { getVSCodeApi } from './vscode-api';

// Hook to use the VS Code API
export const useVSCode = (): WebviewApi<unknown> => {
  const context = useContext(VSCodeContext);
  if (!context) {
    // If no context is found, we're likely in a test environment or outside the provider
    // Return the singleton instance directly
    return getVSCodeApi();
  }
  return context.vscode;
};

// Persistent State Hook
export const usePersistentState = <T,>(defaultValue: T): [T, (newState: T) => void] => {
  const vscode = useVSCode();

  const state = vscode.getState() || defaultValue;

  const setState = (newState: T) => {
    vscode.setState(newState);
    return newState;
  };

  return [state as T, setState];
};
