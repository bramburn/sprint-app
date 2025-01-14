import React, { useState } from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/index';
import SidebarItem from './SidebarItem';

export interface SidebarItem {
  label: string;
  id: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  activeTab: initialActiveTab, 
  onTabChange 
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(initialActiveTab || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <aside 
      role="menu"
      className="sidebar"
      style={{
        backgroundColor: 'var(--vscode-sideBar-background)',
        color: 'var(--vscode-sideBar-foreground)',
        borderRight: '1px solid var(--vscode-sideBar-border)',
        width: '250px',
        height: '100%',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {items.map((item) => (
        <SidebarItem
          key={item.id}
          {...item}
          isActive={activeTab === item.id}
          onClick={() => {
            handleTabChange(item.id);
            item.onClick?.();
          }}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
