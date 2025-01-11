import React, { useEffect, useState } from 'react';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import './App.css';

function App() {
  const [response, setResponse] = useState<string>('');
  const vscode = (window as any).acquireVsCodeApi();

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message.command === 'response') {
        setResponse(message.text);
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  const handleClick = () => {
    vscode.postMessage({ 
      command: 'alert', 
      text: 'Button clicked in Sprint App!' 
    });
  };

  return (
    <div className="p-4">
      <VSCodeButton onClick={handleClick}>
        Click me
      </VSCodeButton>
      {response && (
        <div className="mt-4 p-2 bg-vscode-editor-background">
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
