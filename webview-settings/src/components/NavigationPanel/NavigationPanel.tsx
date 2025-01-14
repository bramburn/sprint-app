import React from 'react';
import styles from './NavigationPanel.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface NavigationPanelProps {
  items: NavItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  items,
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className={styles.navigationPanel} role="menu">
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
          onClick={() => onTabChange(item.id)}
          role="menuitem"
          aria-current={activeTab === item.id ? 'page' : undefined}
        >
          <span className={styles.navIcon}>{item.icon}</span>
          <span className={styles.navLabel}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavigationPanel; 