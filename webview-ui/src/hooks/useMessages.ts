import { useState, useEffect, useCallback } from 'react';
import { Message } from '@shared/messages';

const vscode: ReturnType<typeof acquireVsCodeApi> = acquireVsCodeApi();

export function useMessages() {
  const [response, setResponse] = useState<Message | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message: Message = event.data;
      
      if (message.error) {
        setError(message.error);
        setIsLoading(false);
        return;
      }

      setResponse(message.payload as Message);
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
