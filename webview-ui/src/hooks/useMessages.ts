import { useState, useEffect, useCallback } from 'react';
import { Message, ExtensionMessage, WebviewMessage } from '@shared/messages';

const vscode: ReturnType<typeof acquireVsCodeApi> = acquireVsCodeApi();

export function useMessages() {
  const [response, setResponse] = useState<Message | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message: Message = event.data;
      
      // Type guard to check if it's an ExtensionMessage with an error
      if ('error' in message && message.error) {
        setError(message.error);
        setIsLoading(false);
        return;
      }

      setResponse(message);
      setIsLoading(false);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const sendMessage = useCallback((type: string, payload: unknown) => {
    setIsLoading(true);
    setError(null);
    
    const message: Message = {
      type,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      payload
    };

    vscode.postMessage(message);
  }, []);

  return {
    sendMessage,
    response,
    error,
    isLoading
  };
}
