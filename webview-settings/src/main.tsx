import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ChakraProvider } from './components/ui/provider'
import { ConfigProvider } from '@sprint-app/shared/src/react/context/config-context'
import { VSCodeProvider } from '@sprint-app/shared/src/react/context/vscode-context'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VSCodeProvider>
      <ConfigProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ConfigProvider>
    </VSCodeProvider>
  </React.StrictMode>
)
