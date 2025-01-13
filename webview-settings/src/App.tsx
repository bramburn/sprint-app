import React, { useState, useCallback } from 'react'
import { useVSCode } from '@sprint-app/shared/react/hooks/vscode-hooks'
import DebugTab from './components/DebugTab'
import Sidebar from './components/Sidebar'
import Section from './components/Section'
import Footer from './components/Footer'

// Define interfaces for our settings
interface AccountSettings {
  email: string
  accountType: 'free' | 'pro'
}

interface AIRules {
  rules: string[]
  includeCursorRules: boolean
}

interface AppSettings {
  account: AccountSettings
  aiRules: AIRules
}

const App: React.FC = () => {
  const vscode = useVSCode()
  const [activeTab, setActiveTab] = useState('general')
  const [savedStatus, setSavedStatus] = useState<'saved' | 'saving' | 'error'>('saved')
  const [settings, setSettings] = useState<AppSettings>({
    account: {
      email: 'nitrogen@gmail.com',
      accountType: 'pro'
    },
    aiRules: {
      rules: [
        'Always respond in English',
        'Provide concise and clear explanations',
        'Prioritize user\'s intent'
      ],
      includeCursorRules: true
    }
  })

  const sidebarItems = [
    { label: 'General', id: 'general' },
    { label: 'Models', id: 'models' },
    { label: 'Features', id: 'features' },
    { label: 'Beta', id: 'beta' },
    { label: 'Debug', id: 'debug' }
  ]

  const handleSectionAction = useCallback((action: string) => {
    setSavedStatus('saving')
    try {
      switch (action) {
        case 'manage':
          vscode.postMessage({ 
            command: 'manageAccount', 
            text: 'Open account management' 
          })
          break
        case 'logout':
          vscode.postMessage({ 
            command: 'logout', 
            text: 'User initiated logout' 
          })
          break
        case 'import':
          vscode.postMessage({ 
            command: 'importSettings', 
            text: 'Import VS Code settings' 
          })
          break
      }
      
      // Simulate save delay
      setTimeout(() => {
        setSavedStatus('saved')
      }, 500)
    } catch (error) {
      setSavedStatus('error')
      console.error('Action failed:', error)
    }
  }, [vscode])

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSavedStatus('saving')
    try {
      setSettings(prev => ({
        ...prev,
        ...updates
      }))
      
      // Simulate save delay and send to VSCode
      setTimeout(() => {
        vscode.postMessage({
          command: 'updateSettings',
          settings: { ...settings, ...updates }
        })
        setSavedStatus('saved')
      }, 500)
    } catch (error) {
      setSavedStatus('error')
      console.error('Settings update failed:', error)
    }
  }, [vscode, settings])

  const renderMainContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div>
            <Section 
              title="Account" 
              description={`You are currently signed in with ${settings.account.email}. Account Type: ${settings.account.accountType.toUpperCase()}`}
            >
              <div className="flex space-between">
                <button 
                  className="btn mr-2" 
                  onClick={() => handleSectionAction('manage')}
                >
                  Manage
                </button>
                <button 
                  className="btn" 
                  onClick={() => handleSectionAction('logout')}
                >
                  Log out
                </button>
              </div>
            </Section>

            <Section 
              title="VS Code Import" 
              description="Instantly use all of your extensions, settings, and keybindings."
            >
              <button 
                className="btn" 
                onClick={() => handleSectionAction('import')}
              >
                + Import
              </button>
            </Section>

            <Section 
              title="Rules for AI" 
              description="These rules get shown to the AI on all chats and Ctrl-K sessions."
            >
              <div className="p-4 border rounded bg-gray-100">
                {settings.aiRules.rules.map((rule, index) => (
                  <p key={index}>{rule}</p>
                ))}
              </div>
            </Section>

            <Section 
              title="Include .cursorrules file"
            >
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="cursorrules" 
                  className="mr-2"
                  checked={settings.aiRules.includeCursorRules}
                  onChange={(e) => updateSettings({
                    aiRules: {
                      ...settings.aiRules,
                      includeCursorRules: e.target.checked
                    }
                  })}
                />
                <label htmlFor="cursorrules">
                  If off, we will not include any .cursorrules files in your Rules for AI.
                </label>
              </div>
            </Section>
          </div>
        )
      case 'models':
        return <Section title="Models">Models settings coming soon...</Section>
      case 'features':
        return <Section title="Features">Features settings coming soon...</Section>
      case 'beta':
        return <Section title="Beta">Beta features coming soon...</Section>
      case 'debug':
        return <DebugTab />
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <Sidebar 
        items={sidebarItems} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <main className="main-content">
        {renderMainContent()}
        
        <Footer 
          status={savedStatus} 
          onRetry={() => {
            // Implement retry logic if needed
            setSavedStatus('saving')
            updateSettings(settings)
          }} 
        />
      </main>
    </div>
  )
}

export default App
