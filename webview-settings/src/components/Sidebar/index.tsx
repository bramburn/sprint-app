import React from 'react'

export interface SidebarItem {
  label: string
  id: string
  icon?: string
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
  return (
    <aside className="sidebar">
      <h1 className="sidebar-header">Cursor Settings</h1>
      <ul className="sidebar-items">
        {items.map(item => (
          <li 
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            {item.icon && <span className="sidebar-item-icon">{item.icon}</span>}
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
