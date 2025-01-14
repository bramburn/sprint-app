import React, { useState } from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/useTheme';
import SidebarItem from './components/Sidebar/SidebarItem';

// Define settings items type
type SettingItem = {
  title: string;
  description: string;
  enabled: boolean;
  additionalInfo?: string;
};

const App: React.FC = () => {
  
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState('Beta');

  // Predefined menu items
  const menuItems = [
    { id: 'general', label: 'General', icon: <span className="codicon codicon-gear" /> },
    { id: 'models', label: 'Models', icon: <span className="codicon codicon-graph" /> },
    { id: 'features', label: 'Features', icon: <span className="codicon codicon-tools" /> },
    { id: 'beta', label: 'Beta', icon: <span className="codicon codicon-beaker" /> },
  ];

  // Predefined settings for Beta features
  const betaSettings: SettingItem[] = [
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

  // Toggle setting handler (placeholder)
  const handleToggleSetting = (settingTitle: string) => {
    console.log(`Toggled setting: ${settingTitle}`);
  };

  return (
    <div 
      className="h-full bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] flex flex-col"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--vscode-editorGroup-border)]">
        <h1 className="text-lg font-semibold">Cursor Settings</h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Navigation Panel */}
        <div 
          className="w-1/5 border-r border-[var(--vscode-editorGroup-border)] p-2"
          role="menu"
        >
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              id={item.id}
              isActive={activeMenu === item.label}
              onClick={() => setActiveMenu(item.label)}
            />
          ))}
        </div>

        {/* Content Panel */}
        <div className="w-4/5 p-4 space-y-6">
          <h2 className="text-lg font-semibold">{activeMenu} Features</h2>
          
          {activeMenu === 'Beta' && betaSettings.map((setting) => (
            <div key={setting.title} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => handleToggleSetting(setting.title)}
                  className="cursor-pointer"
                  aria-label={`Toggle ${setting.title}`}
                />
                <p>{setting.title}</p>
              </div>
              <p className="text-sm text-[var(--vscode-descriptionForeground)]">
                {setting.description}
              </p>
              {setting.additionalInfo && (
                <p className="text-sm text-[var(--vscode-descriptionForeground)] border-l-2 border-dashed pl-3">
                  {setting.additionalInfo}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;