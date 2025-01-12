import { useEffect, useState } from 'react'

import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [baseUri, setBaseUri] = useState(window.baseUri)
  const viteLogo = `${baseUri}/vite.svg`
  const reactLogo = `${baseUri}/react.svg`

  useEffect(() => {
    //emit ready event to parent
  const sendMessageToBackend = () => {
    const vscode = acquireVsCodeApi(); // Get the VS Code API
    vscode.postMessage({
      command: 'ready',
      text: true,
    });
  };
  sendMessageToBackend();

    window.addEventListener('message', (event) => {
      if (event.data.type === 'setBaseUri') {
        setBaseUri(event.data.uri)
      }
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
  throw new Error('Function not implemented.')
}

