/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVSCode } from '@shared/react/hooks/vscode-hooks';

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
export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        case 'config':
          // Merge received configuration with default configuration
          { const updatedConfig = {
            ...defaultConfig,
            ...message.payload
          };
          setConfig(updatedConfig);
          break; }
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

  // Provide a method to update configuration
  const updateConfig = (newConfig: Config) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...newConfig
    }));

    // Optionally send configuration update back to extension
    vscode.postMessage({
      command: 'updateConfig',
      payload: newConfig
    });
  };

  return (
    <ConfigContext.Provider value={{ 
      config: config || defaultConfig, 
      setConfig: updateConfig 
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

// Custom hook to use the configuration
export const useConfig = (): ConfigContextValue => {
  const context = useContext(ConfigContext);
  
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  
  return context;
};
