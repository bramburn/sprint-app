import React, { useEffect, useState } from 'react';
import { 
  VSCodeButton, 
  VSCodeProgressRing,
  VSCodeDivider
} from '@vscode/webview-ui-toolkit/react';
import './App.css';

interface Message {
  command: string;
  text: string;
  error?: string;
}

function App() {
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const vscode = (window as any).acquireVsCodeApi();

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message: Message = event.data;
      setLoading(false);

      switch (message.command) {
        case 'response':
          setResponse(message.text);
          setError('');
          break;
        case 'error':
          setError(message.error || 'Unknown error occurred');
          break;
        default:
          console.warn('Unknown command:', message.command);
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  const handleClick = () => {
    setLoading(true);
    setError('');
    try {
      vscode.postMessage({ 
        command: 'alert', 
        text: 'Button clicked in Sprint App!' 
      });
    } catch (err) {
      setError('Failed to send message to extension');
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <VSCodeButton 
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Click me'}
      </VSCodeButton>

      {loading && (
        <div className="mt-4">
          <VSCodeProgressRing />
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 text-red-500">
          {error}
        </div>
      )}

      {response && (
        <>
          <VSCodeDivider className="my-4" />
          <div className="p-2 bg-vscode-editor-background">
            {response}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
