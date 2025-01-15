import React from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/index';

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const { theme } = useTheme();

  const tabStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      borderBottom: `1px solid ${theme.secondary}`,
      padding: '0.5rem',
      background: theme.background,
    },
    tabList: {
      display: 'flex',
    },
    tab: {
      padding: '0.75rem 1rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 150ms',
      color: theme.foreground,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    activeTab: {
      color: theme.accent,
      borderBottom: `2px solid ${theme.accent}`,
    },
    inactiveTab: {
      color: theme.secondary,
      ':hover': {
        color: theme.foreground,
      },
    },
    actionButtons: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    actionButton: {
      padding: '0.25rem',
      color: theme.secondary,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '0.25rem',
      ':hover': {
        color: theme.foreground,
      },
    },
  };

  return (
    <div style={tabStyles.container}>
      <div style={tabStyles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              ...tabStyles.tab,
              ...(activeTab === tab.id ? tabStyles.activeTab : tabStyles.inactiveTab),
            }}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.icon && <span className={`codicon codicon-${tab.icon}`} />}
            {tab.label}
          </button>
        ))}
      </div>
      <div style={tabStyles.actionButtons}>
        <button
          style={tabStyles.actionButton}
          aria-label="New chat"
        >
          <span className="codicon codicon-add" />
        </button>
        <button
          style={tabStyles.actionButton}
          aria-label="More options"
        >
          <span className="codicon codicon-ellipsis" />
        </button>
      </div>
    </div>
  );
};

export default TabNavigation; 