import  { useEffect, useState } from 'react'
import './App.css'
import { useVSCode } from '@shared/react/hooks/vscode-hooks'

function App() {
  const vscode = useVSCode()
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    const messageToSend = `Hello from React at ${new Date().toLocaleTimeString()}!`
    vscode.postMessage({ command: 'greeting', text: messageToSend })
    setMessage(messageToSend)
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.command === 'incomingMessage') {
        setMessage(event.data.text)
      }
    })
  }, [])

  return (
    <div className="App">
      <h1>VS Code Webview React App</h1>
      <button onClick={sendMessage}>Send Message to VS Code</button>
      {message && <p>Last sent message: {message}</p>}
    </div>
  )
}

export default App
