import React from 'react';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
function App() {
    const handleClick = () => {
        // Send a message to the extension
        const vscode = window.acquireVsCodeApi();
        vscode.postMessage({
            command: 'alert',
            text: 'Button clicked in Sprint App!'
        });
    };
    return (<div className="App">
      <header className="App-header">
        <h1>Sprint App</h1>
        <VSCodeButton onClick={handleClick}>Click me</VSCodeButton>
      </header>
    </div>);
}
export default App;
//# sourceMappingURL=App.js.map