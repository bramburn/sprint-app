import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { VSCodeProvider } from '@sprint-app/shared/react/context/vscode-context'
import { ConfigProvider } from '@sprint-app/shared/react/context/config-context'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VSCodeProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </VSCodeProvider>
  </React.StrictMode>,
)
