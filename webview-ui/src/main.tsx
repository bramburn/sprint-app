import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { VSCodeProvider } from './vscode-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VSCodeProvider>
      <App />
    </VSCodeProvider>
  </StrictMode>,
)
