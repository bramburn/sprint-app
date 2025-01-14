import React, { useState } from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/useTheme';
import Header from './components/Header/Header';
import NavigationPanel, { NavItem } from './components/NavigationPanel/NavigationPanel';
import ContentPanel, { Setting } from './components/ContentPanel/ContentPanel';
import ModelSection from './components/ModelSection/ModelSection';
import styles from './App.module.css';

const App: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('beta');

  // Navigation items
  const navItems: NavItem[] = [
    { id: 'general', label: 'General', icon: <span className="codicon codicon-gear" /> },
    { id: 'models', label: 'Models', icon: <span className="codicon codicon-graph" /> },
    { id: 'features', label: 'Features', icon: <span className="codicon codicon-tools" /> },
    { id: 'beta', label: 'Beta', icon: <span className="codicon codicon-beaker" /> },
  ];

  // Beta settings
  const betaSettings: Setting[] = [
    {
      title: 'Notepads',
      description: 'Craft and share context between chat and composers',
      enabled: true,
    },
    {
      title: 'Bug Finder',
      description: 'Run a bug finder on your current git diff to find bugs.',
      additionalInfo: 'Check out the Bug Finder tab next to Chat',
      enabled: true,
    },
  ];

  // Toggle setting handler
  const handleToggleSetting = (settingTitle: string) => {
    console.log(`Toggled setting: ${settingTitle}`);
  };

  // Get content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'models':
        return <ModelSection />;
      case 'beta':
        return (
          <ContentPanel
            title="Beta Features"
            settings={betaSettings}
            onToggleSetting={handleToggleSetting}
          />
        );
      case 'general':
        return (
          <ContentPanel
            title="General Settings"
            settings={[]} // Placeholder for general settings
          />
        );
      case 'features':
        return (
          <ContentPanel
            title="Feature Settings"
            settings={[]} // Placeholder for feature settings
          />
        );
      default:
        return (
          <ContentPanel
            title="Settings"
            settings={[]}
          />
        );
    }
  };

  return (
    <div className={styles.appWrapper}>
      <Header title="Cursor Settings" />
      <div className={styles.mainLayout}>
        <NavigationPanel
          items={navItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className={styles.contentWrapper}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;