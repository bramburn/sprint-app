import type { WebviewApi } from 'vscode-webview';
import { useContext, useEffect, useState, useCallback } from 'react';
import { VSCodeContext } from '../context/vscode-context';
import { getVSCodeApi } from '../api/vscode-api';
import { 
  WebviewMessage, 
  MessageCommand, 
  createReadyMessage, 
  isValidMessage,
  ClientCapabilities
} from '../../messages/types';
import { MessageDispatcher, createDefaultDispatcher } from '../../messages/handler';

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

/**
 * Hook for managing VS Code webview messaging
 */
export const useVSCodeMessaging = (): {
  sendMessage: (message: WebviewMessage) => void;
  registerHandler: (command: MessageCommand, handler: (message: WebviewMessage) => void | Promise<void>) => void;
  unregisterHandler: (command: MessageCommand, handler: (message: WebviewMessage) => void | Promise<void>) => void;
  isReady: boolean;
} => {
  const vscode = useVSCode();
  const [dispatcher] = useState(() => createDefaultDispatcher());
  const [isReady, setIsReady] = useState(false);

  // Detect client capabilities
  const getClientCapabilities = useCallback((): ClientCapabilities => ({
    supportsDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    supportsAnimation: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    browserInfo: {
      userAgent: navigator.userAgent,
      language: navigator.language
    }
  }), []);

  // Send ready message
  const sendReadyMessage = useCallback(() => {
    const readyMessage = createReadyMessage(
      `webview-${Date.now()}`, 
      getClientCapabilities()
    );
    vscode.postMessage(readyMessage);
    setIsReady(true);
  }, [vscode, getClientCapabilities]);

  // Message receiver
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      
      // Only process messages from VS Code
      if (!isValidMessage(message)) return;

      dispatcher.dispatch(message);
    };

    // Add event listener
    window.addEventListener('message', messageHandler);

    // Send ready message on mount
    sendReadyMessage();

    // Cleanup
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [dispatcher, sendReadyMessage]);

  // Method to send messages
  const sendMessage = useCallback((message: WebviewMessage) => {
    if (!isReady) {
      console.warn('Attempting to send message before webview is ready');
      return;
    }
    vscode.postMessage(message);
  }, [vscode, isReady]);

  // Method to register message handlers
  const registerHandler = useCallback((
    command: MessageCommand, 
    handler: (message: WebviewMessage) => void | Promise<void>
  ) => {
    dispatcher.register(command, { handle: handler });
  }, [dispatcher]);

  // Method to unregister message handlers
  const unregisterHandler = useCallback((
    command: MessageCommand, 
    handler: (message: WebviewMessage) => void | Promise<void>
  ) => {
    dispatcher.unregister(command, { handle: handler });
  }, [dispatcher]);

  return {
    sendMessage,
    registerHandler,
    unregisterHandler,
    isReady
  };
};
