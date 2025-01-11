import React from 'react';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sprint App</h1>
        <VSCodeButton>Click me</VSCodeButton>
      </header>
    </div>
  );
}

export default App;
