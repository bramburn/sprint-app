import { useEffect, useState } from 'react'
// import type { WebviewApi } from 'vscode-webview';
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  

  const baseUri = window.baseUri;

  useEffect(() => {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({
      type: 'ready',
      data: true
    });
  }, [baseUri]);

  return (
    <>
      <div>
        <p>nothing</p>
      </div>
      <h1>Vite + React</h1>
      <p>The base URI is {baseUri}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
function acquireVsCodeApi() {
  // Use the global function provided by VSCode
  return (window as any).acquireVsCodeApi();
}
