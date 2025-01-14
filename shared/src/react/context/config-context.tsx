/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVSCode } from '../hooks/vscode-hooks';

// Define the shape of the configuration
export interface Config {
  theme: string;
  language: string;
  featureFlags?: {
    experimental?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

// Define the context type
interface ConfigContextValue {
  config: Config | null;
  setConfig: (newConfig: Config) => void;
}

// Create the context with a more explicit undefined check
const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

// Provider component
export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const vscode = useVSCode();
  const [config, setConfig] = useState<Config | null>(null);

  // Default configuration
  const defaultConfig: Config = {
    theme: 'default',
    language: 'en',
    featureFlags: {
      experimental: false
    }
  };

  // Send "ready" message and listen for configuration response
  useEffect(() => {
    // Send initial ready message
    vscode.postMessage({ 
      command: 'ready', 
      payload: { requestConfig: true } 
    });

    // Message handler
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      switch (message.command) {
        case 'updateConfig':
          setConfig(message.payload);
          break;
        default:
          break;
      }
    };

    // Add event listener
    window.addEventListener('message', handleMessage);

    // Cleanup listener
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [vscode]);

  // Merge new config with existing or default
  const updateConfig = (newConfig: Partial<Config>) => {
    const updatedConfig = { 
      ...defaultConfig, 
      ...(config || {}), 
      ...newConfig 
    };

    // Post message to update config
    vscode.postMessage({
      command: 'updateConfig',
      payload: updatedConfig
    });

    setConfig(updatedConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, setConfig: updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

// Custom hook to use the configuration
export const useConfig = (): ConfigContextValue => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
