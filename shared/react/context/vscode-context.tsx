import React, { createContext } from 'react';
import type { WebviewApi } from 'vscode-webview';
import { getVSCodeApi } from '../api/vscode-api';

// Define the context type
interface VSCodeContextValue {
  vscode: WebviewApi<unknown>;
}

// Create the context
export const VSCodeContext = createContext<VSCodeContextValue | undefined>(undefined);

// Provider component
export const VSCodeProvider = ({ children }: { children: React.ReactNode }) => {
  // No need for useMemo anymore since getVSCodeApi handles the singleton pattern
  const vscode = getVSCodeApi();

  return (
    <VSCodeContext.Provider value={{ vscode }}>
      {children}
    </VSCodeContext.Provider>
  );
};
