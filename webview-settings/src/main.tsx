import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from '@sprint-app/shared/react/context/config-context'
import { VSCodeProvider } from '@sprint-app/shared/react/context/vscode-context'
import { ThemeProvider } from './theme/context/ThemeProvider'
import App from './App'
import './theme/styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VSCodeProvider>
      <ConfigProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ConfigProvider>
    </VSCodeProvider>
  </React.StrictMode>
)
