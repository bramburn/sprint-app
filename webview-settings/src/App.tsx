import React, { useState, useCallback } from 'react'
import { useVSCode } from '@sprint-app/shared/react/hooks/vscode-hooks';
import DebugTab from './components/DebugTab'
import Sidebar, { SidebarItem } from './components/Sidebar'
import { Section } from './components/Section'
import Footer from './components/Footer'
import FieldFormsTab from './components/FieldFormsTab'
import { AccordionTabsTab } from './components/AccordionTabsTab'
import MessagingTab from './components/messaging/MessagingTab'
import { ThemeSettings } from './pages/ThemeSettings'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from './theme/hooks/useTheme'

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
  const { theme } = useTheme()
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

  const sidebarItems: SidebarItem[] = [
    { 
      label: 'General', 
      id: 'general',
      onClick: () => setActiveTab('general')
    },
    { 
      label: 'Field Forms', 
      id: 'field-forms',
      onClick: () => setActiveTab('field-forms')
    },
    { 
      label: 'Accordion & Tabs', 
      id: 'accordion-tabs',
      onClick: () => setActiveTab('accordion-tabs')
    },
    { 
      label: 'Models', 
      id: 'models',
      onClick: () => setActiveTab('models')
    },
    { 
      label: 'Features', 
      id: 'features',
      onClick: () => setActiveTab('features')
    },
    { 
      label: 'Beta', 
      id: 'beta',
      onClick: () => setActiveTab('beta')
    },
    { 
      label: 'Messaging', 
      id: 'messaging',
      onClick: () => setActiveTab('messaging')
    },
    { 
      label: 'Theme Settings', 
      id: 'theme',
      onClick: () => setActiveTab('theme')
    },
    { 
      label: 'Debug', 
      id: 'debug',
      onClick: () => setActiveTab('debug')
    }
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
      case 'field-forms':
        return <FieldFormsTab />
      case 'accordion-tabs':
        return <AccordionTabsTab />
      case 'models':
        return <Section title="Models">Models settings coming soon...</Section>
      case 'features':
        return <Section title="Features">Features settings coming soon...</Section>
      case 'beta':
        return <Section title="Beta">Beta features coming soon...</Section>
      case 'messaging':
        return <MessagingTab />
      case 'theme':
        return <ThemeSettings />
      case 'debug':
        return <DebugTab />
      default:
        return null
    }
  }

  return (
    <Router>
      <div 
        className="app-container"
        style={{
          display: 'flex',
          height: '100vh',
          backgroundColor: theme.colors.editorBackground,
          color: theme.colors.editorForeground
        }}
      >
        <Sidebar 
          items={sidebarItems} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <main 
          className="main-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px'
          }}
        >
          <Routes>
            <Route path="/general" element={renderMainContent()} />
            <Route path="/field-forms" element={<FieldFormsTab />} />
            <Route path="/accordion-tabs" element={<AccordionTabsTab />} />
            <Route path="/models" element={<Section title="Models">Models settings coming soon...</Section>} />
            <Route path="/features" element={<Section title="Features">Features settings coming soon...</Section>} />
            <Route path="/beta" element={<Section title="Beta">Beta features coming soon...</Section>} />
            <Route path="/messaging" element={<MessagingTab />} />
            <Route path="/theme" element={<ThemeSettings />} />
            <Route path="/debug" element={<DebugTab />} />
            <Route path="/" element={renderMainContent()} />
          </Routes>
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
    </Router>
  )
}

export default App
