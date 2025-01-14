import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from '@sprint-app/shared/react/context/config-context'
import { ThemeProvider } from '@sprint-app/shared/react/hooks'
import { VSCodeProvider } from '@sprint-app/shared/react/context/vscode-context'
import App from './App'

// Import global styles
import '@sprint-app/shared/theme/variables.css'
import '@sprint-app/shared/theme/styles/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VSCodeProvider>
      <ThemeProvider>
        <ConfigProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </ThemeProvider>
    </VSCodeProvider>
  </React.StrictMode>
)
