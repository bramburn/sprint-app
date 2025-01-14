import React, { useState, useEffect, useCallback } from 'react'
import { useVSCode, useVSCodeMessaging } from '@sprint-app/shared/react/hooks/vscode-hooks';
import { useTheme } from '@sprint-app/shared/react/hooks/useTheme';
import { MessageCommand } from '@sprint-app/shared/messages/types';
import DebugTab from './components/DebugTab'
import Sidebar, { SidebarItem } from './components/Sidebar'
import { Section } from './components/Section'
import Footer from './components/Footer'
import FieldFormsTab from './components/FieldFormsTab'
import { AccordionTabsTab } from './components/AccordionTabsTab'
import MessagingTab from './components/messaging/MessagingTab'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
  const { sendMessage, registerHandler, unregisterHandler, isReady } = useVSCodeMessaging()
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

  // Register handler for settings update
  useEffect(() => {
    if (!isReady) return;

    const settingsUpdateHandler = registerHandler(MessageCommand.SETTINGS_UPDATE, (message) => {
      // Update local settings from received message
      setSettings(prevSettings => ({
        ...prevSettings,
        ...message.payload.settings
      }));
      setSavedStatus('saved');
    });

    // Register theme update handler
    const themeUpdateHandler = registerHandler(MessageCommand.THEME_UPDATE, (message) => {
      // Theme will be automatically updated by useTheme hook
      console.log('Theme update received:', message.payload.theme);
    });

    // Cleanup handlers when component unmounts
    return () => {
      if (settingsUpdateHandler) {
        unregisterHandler(MessageCommand.SETTINGS_UPDATE, settingsUpdateHandler);
      }
      if (themeUpdateHandler) {
        unregisterHandler(MessageCommand.THEME_UPDATE, themeUpdateHandler);
      }
    };
  }, [isReady, registerHandler, unregisterHandler, setSettings]);

  // Send settings when they change
  useEffect(() => {
    if (!isReady) return;

    const settingsRecord: Record<string, unknown> = {
      account: {
        email: settings.account.email,
        accountType: settings.account.accountType
      },
      aiRules: {
        rules: settings.aiRules.rules,
        includeCursorRules: settings.aiRules.includeCursorRules
      }
    };

    sendMessage({
      command: MessageCommand.SETTINGS_UPDATE,
      timestamp: Date.now(),
      id: `settings-${Date.now()}`,
      payload: {
        settings: settingsRecord,
        version: 1
      }
    });
  }, [settings, isReady, sendMessage]);

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

  const updateSettings = useCallback((updates: Record<string, unknown>) => {
    setSavedStatus('saving')
    try {
      setSettings(prev => ({
        ...prev,
        ...updates
      }))
      
      // Simulate save delay and send to VSCode
      setTimeout(() => {
        const settingsRecord: Record<string, unknown> = {
          account: {
            email: settings.account.email,
            accountType: settings.account.accountType
          },
          aiRules: {
            rules: settings.aiRules.rules,
            includeCursorRules: settings.aiRules.includeCursorRules
          }
        };

        vscode.postMessage({
          command: 'updateSettings',
          settings: settingsRecord
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
          backgroundColor: theme.colors.background,
          color: theme.colors.foreground
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
