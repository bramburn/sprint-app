import React from 'react';
import { useTheme } from '../../theme/hooks/useTheme';
import { ThemedWrapper } from '../../theme/components/ThemedWrapper';
import { ThemedButton } from '../../theme/components/ThemedButton';

export interface SidebarItem {
  label: string
  id: string
  icon?: React.ReactNode
  onClick: () => void
}

export interface SidebarProps {
  items: SidebarItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  activeTab, 
  onTabChange 
}) => {
  const { theme } = useTheme();

  return (
    <ThemedWrapper 
      tagName="aside"
      className="sidebar"
      style={{
        backgroundColor: theme.colors.listHoverBackground,
        borderRight: `1px solid ${theme.colors.border}`
      }}
    >
      <nav>
        {items.map(item => (
          <ThemedButton
            key={item.id}
            variant="secondary"
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'flex-start',
              marginBottom: '8px'
            }}
          >
            {item.icon && <span className="sidebar-item-icon mr-2">{item.icon}</span>}
            {item.label}
          </ThemedButton>
        ))}
      </nav>
    </ThemedWrapper>
  )
}

export default Sidebar
