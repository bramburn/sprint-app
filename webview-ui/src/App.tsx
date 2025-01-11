import React, { useState } from 'react';
import { VSCodeButton, VSCodeTextField, VSCodeProgressRing } from '@vscode/webview-ui-toolkit/react';
import { useMessages } from './hooks/useMessages';

function App() {
  const [inputText, setInputText] = useState('');
  const { sendMessage, response, error, isLoading } = useMessages();

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendMessage('user_input', { text: inputText });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="App p-4 max-w-md mx-auto">
      <header className="App-header mb-6">
        <h1 className="text-2xl font-bold mb-4">Sprint App Communication Test</h1>
        
        <div className="flex space-x-2 mb-4">
          <VSCodeTextField 
            value={inputText}
            onChange={(e) =>
              handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            placeholder="Enter a message"
            className="flex-grow"
          />
          <VSCodeButton onClick={handleSendMessage} disabled={isLoading}>
            Send
          </VSCodeButton>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center mb-4">
            <VSCodeProgressRing />
            <span className="ml-2">Sending message...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            Error: {error}
          </div>
        )}

        {response && (
          <div className="bg-green-100 text-green-700 p-2 rounded">
            <strong>Response:</strong> {JSON.stringify(response, null, 2)}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
