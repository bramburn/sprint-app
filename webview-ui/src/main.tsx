import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VSCodeProvider } from './vscode-context'
import { ConfigProvider } from './config-context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VSCodeProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </VSCodeProvider>
  </React.StrictMode>,
)
